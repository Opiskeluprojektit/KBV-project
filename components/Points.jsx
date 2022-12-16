import {
  Text,
  View,
  Pressable,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { style } from "../styles/styles";
import * as Icon from "react-native-feather";
import { List, TextInput } from "react-native-paper";

import * as db from "../assets/testidata.json";
import { MyDate, formatDMYtoYMD } from "../scripts/myDate";

import { database } from "../firebase/Config";
import { onValue, ref, set } from "firebase/database";
import { color } from "react-native-reanimated";

const backgroundImage = require("../assets/Volleyball100.png");

//Make deep copies of players, enrolments and games from the test data (testidata.json).
/* const dbPlayers = JSON.parse(JSON.stringify(db.player));
const dbEnrolments = JSON.parse(JSON.stringify(db.enrolment));
const sortedDbGames = JSON.parse(JSON.stringify(db.game))
  .map((i) => {
    i.date = new MyDate(formatDMYtoYMD(i.date));
    return i;
  })
  .filter((i) => i.date >= new Date ())
  .sort((a, b) => a.date - b.date); */

function Points({ navigation }) {
  const [division, setDivision] = useState();
  const [divisionsExpanded, setDivisionsExpanded] = useState(false);
  const [gamesToShow, setGamesToShow] = useState([]);
  const [chosenGame, setChosenGame] = useState();
  const [gamesExpanded, setGamesExpanded] = useState(false);
  const [enrolledPlayers, setEnrolledPlayers] = useState();
  const [groups, setGroups] = useState();
  const [game, setGame] = useState();

  // Bonus multiplier still needs to be fetched from the administration in the db.
  const [bonusMultiplier, setBonusMultiplier] = useState();
  //const [searchPlayer, setSearchPlayer] = useState('')

  // Players and enrolments from the database
  const [player, setPlayer] = useState([]);
  const [enrolment, setEnrolment] = useState([]);

  // Collects game information from firebase database
  useEffect(() => {
    const games = ref(database, "game/");
    onValue(games, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const gameItems = { ...data };
      const parse = JSON.parse(JSON.stringify(gameItems));
      let parseKeys = Object.values(parse)
        .map((i) => {
          i.date = new MyDate(formatDMYtoYMD(i.date));
          return i;
        })
        .filter((i) => i.date >= new Date())
        .sort((a, b) => a.date - b.date);
      setGame(parseKeys);
      setGamesToShow(parseKeys);
    });
  }, []);

  // Collects player information from firebase database
  useEffect(() => {
    const players = ref(database, "player/");
    onValue(players, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const playerItems = { ...data };
      const parse = JSON.parse(JSON.stringify(playerItems));
      let parseKeys = Object.values(parse);
      setPlayer(parseKeys);
    });
  }, []);

  // Collects enrolment information from firebase database
  useEffect(() => {
    const enrolment = ref(database, "enrolment/");
    onValue(enrolment, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const enrolmentItems = { ...data };
      const parse = JSON.parse(JSON.stringify(enrolmentItems));
      const parseKeys = Object.values(parse);
      setEnrolment(parseKeys);
    });
  }, []);

  // Fetches the bonus multiplier from the database.
  useEffect(() => {
    const administration = ref(database, "administration/0");
    onValue(administration, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const adminItems = { ...data };
      const parse = JSON.parse(JSON.stringify(adminItems));
      setBonusMultiplier(parse.bonuskerroin);
    });
  }, []);

  useEffect(() => {
    gameList = mapGames();
  }, [gamesToShow]);

  useEffect(() => {
    filterGames();
  }, [division]);

  useEffect(() => {
    filterEnrolments();
  }, [chosenGame]);

  useEffect(() => {
    groupPlayers();
  }, [enrolledPlayers]);

  const selectDivision = (div) => {
    setDivisionsExpanded(!divisionsExpanded);
    setDivision(div);
  };

  const filterGames = () => {
    if (division) {
      const newGamesToShow = game.filter((i) => i.division === division);
      console.log("filtered game", game);
      setGamesToShow(newGamesToShow);
    }
  };

  const selectGame = (game) => {
    setGamesExpanded(!gamesExpanded);
    setChosenGame(game);
  };

  const getGameTitle = (i) => {
    i.date = new Date(i.date);
    return (
      i.division +
      " " +
      i.date.getDate() +
      "." +
      (i.date.getMonth() + 1) +
      "." +
      i.date.getFullYear()
    );
  };

  const mapGames = () => {
    return gamesToShow.map((i) => (
      <List.Item
        key={i.id}
        title={getGameTitle(i)}
        onPress={() => selectGame(i)}
      />
    ));
  };

  let gameList = gamesToShow ? mapGames() : null;

  const filterEnrolments = () => {
    let enrolmentsToChosenGame;
    //console.log("chosenGame: ", chosenGame);
    chosenGame
      ? (enrolmentsToChosenGame = enrolment
          .concat()
          .filter((i) => i.game_id == chosenGame.id))
      : null;
    let newEnrolledPlayers;
    enrolmentsToChosenGame
      ? (newEnrolledPlayers = player
          .concat()
          .filter((i) =>
            enrolmentsToChosenGame.find((j) => j.player_id === i.id)
          )
          .sort((a, b) => b.ranking - a.ranking))
      : null;
    //newEnrolledPlayers ? console.log("newEnrolledPlayers:", newEnrolledPlayers) : null
    newEnrolledPlayers ? setEnrolledPlayers(newEnrolledPlayers) : null;
    //newEnrolledPlayers ? console.log("newEnrolledPlayers: ", newEnrolledPlayers) : null;
  };

  //Flatlist components and functions

  const GroupSeparator = () => {
    <View style={style.groupSeparator}></View>;
  };

  const Group = ({ item }) => {
    return (
      <View>
        <Text style={style.pointTitles}>Lohko {item[0].group + 1}</Text>
        <FlatList
          data={item}
          ItemSeparatorComponent={PlayerSeparator}
          renderItem={Player}
        />
      </View>
    );
  };

  const handleScoreChange = (points, round, group) => {
    //update points to groups.
    let newGroups = groups.concat();

    //Check if user has typed in an entire number instead of "." or "-";
    if (Number(points)) {
      newGroups[group] = newGroups[group].reduce(
        (newGroup, player, playerNumber) => {
          player.scores[round] =
            playerNumber == 0 ||
            (round == 0 && playerNumber == 3) ||
            (round == 1 && playerNumber == 1) ||
            (round == 2 && playerNumber == 2)
              ? Number(points)
              : Number(-points);
          player.sum = player.scores.reduce((sum, score) => {
            return sum + score;
          }, 0);
          newGroup.push(player);
          return newGroup;
        },
        []
      );
      console.log("newGrouops:", newGroups);
      //newGroups[group][0].scores[round] = points;
      //finally make an useEffect that reacts to groups to calculate ranking scores.
      //Actually propably not a good idea to make an useEffect for that, lets instead make a function for it.
      newGroups = countRankingScoresByGroup(newGroups, group);
    } else {
      //Save the incomplete input into the groups.
      newGroups[group][0].scores[round] = points;
    }
    setGroups(newGroups);
  };

  // Counts the ranking scores each player, without changing their order in the groups.player array.
  // This could be changed to only happen when the user submits the scores to the database to improve performance of the list,
  // since the product owner doesn't see need to show the ranking scores in this view.
  const countRankingScoresByGroup = (groups, groupNumber) => {
    let temp = JSON.parse(JSON.stringify(groups));
    temp[groupNumber] = temp[groupNumber].sort((a, b) => b.sum - a.sum);
    temp[groupNumber].reduce((group, player, i) => {
      //base points first:
      player.ranking = 15.5 + 0.5 * (1 - (i + 1)) - (groupNumber + 1) / 2;
      //bonus points:
      player.ranking +=
        ((player.sum + 63) / 252) *
        (50 - (groupNumber + 1) - 1 * bonusMultiplier);
      group.push(player);
      return group;
    }, []);
    console.log("groups in scores", groups);

    let newGroups = groups.concat();

    newGroups[groupNumber] = groups[groupNumber].reduce((group, player, i) => {
      player.ranking = temp[groupNumber].find(
        (e) => player.name === e.name
      ).ranking;
      group.push(player);
      return group;
    }, []);

    return newGroups;
  };

  const Player = ({ item }) => {
    return (
      <View>
        <View style={style.playerContainer}>
          <Text style={style.pointTexts}>{item.name}</Text>
        </View>
        {item.orderNumber % 4 == 0 ? (
          <View style={style.playerScoresContainer}>
            <TextInput
              style={style.numInput}
              underlineColor={"#1B1B1B"}
              activeUnderlineColor={"#005C70"}
              value={item.scores[0] ? item.scores[0].toString() : ""}
              keyboardType={"number-pad"}
              onChangeText={(value) => handleScoreChange(value, 0, item.group)}
              label={"Erä 1"}
            />
            <TextInput
              style={style.numInput}
              underlineColor={"#1B1B1B"}
              activeUnderlineColor={"#005C70"}
              value={item.scores[1] ? item.scores[1].toString() : ""}
              keyboardType={"number-pad"}
              onChangeText={(value) => handleScoreChange(value, 1, item.group)}
              label={"Erä 2"}
            />
            <TextInput
              style={style.numInput}
              underlineColor={"#1B1B1B"}
              activeUnderlineColor={"#005C70"}
              value={item.scores[2] ? item.scores[2].toString() : ""}
              keyboardType={"number-pad"}
              onChangeText={(value) => handleScoreChange(value, 2, item.group)}
              label={"Erä 3"}
            />
            {/* raking score: */}
            <View style={style.rankingNumber}>
              <Text style={style.text}>{item.sum}</Text>
            </View>
          </View>
        ) : (
          <View style={style.playerScoresContainer}>
            <Text style={[style.numInput, style.numInputText]}>
              {item.scores[0]}
            </Text>
            <Text style={[style.numInput, style.numInputText]}>
              {item.scores[1]}
            </Text>
            <Text style={[style.numInput, style.numInputText]}>
              {item.scores[2]}
            </Text>
            {/* raking score: */}
            <View style={style.rankingNumber}>
              <Text style={style.text}>{item.sum}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const PlayerSeparator = () => {
    <View style={style.playerSeparator}></View>;
  };

  //divides the players in to groups of 4. Uncomment the commented console logs to see what this does.
  const groupPlayers = () => {
    //console.log(enrolledPlayers);
    const newGroups = enrolledPlayers
      ? enrolledPlayers.reduce((groups, player, i) => {
          let j = Math.floor(i / 4);
          groups[j] = groups[j] || [];
          player = addScoringVariablesToPlayer(player, i, j);
          groups[j].push(player);
          return groups;
        }, [])
      : null;
    //console.log("newGroups: ", newGroups);

    setGroups(newGroups);
  };

  const addScoringVariablesToPlayer = (player, i, j) => {
    //Gives the player objects, scores, sum and ranking keys, for calculating and submitting competition results.
    player.scores = [];
    player.sum = null;
    player.ranking = null;
    //These last two are given to make the nested FlatList management easier.
    player.orderNumber = i;
    player.group = j;

    return player;
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <View style={[style.container, { flexDirection: "column" }]}>
        <View style={{ flex: 1 }}>
          <View style={style.pointsHeader}>
            <Pressable onPress={() => navigation.navigate("Home")}>
              <View style={[style.iconsEllipse]}>
                <Icon.ChevronLeft style={[style.icons]} />
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Menu")}>
              <View>
                <Icon.Menu style={style.menuButton} width={42} height={40} />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={style.pointsContainer}>
          <View style={{ flex: 1, marginHorizontal: 24 }}>
            <Text style={style.h4Style}>Pisteiden syöttö</Text>
            <List.Section>
              <List.Accordion
                title={division ? division : "Sarjavalikko"}
                style={style.search}
                theme={{
                  colors: { background: "#F9F9F9", primary: "#005C70" },
                }}
                expanded={divisionsExpanded}
                onPress={() => setDivisionsExpanded(!divisionsExpanded)}
              >
                <List.Item
                  title="Naiset"
                  onPress={() => selectDivision("Naiset")}
                />
                <List.Item
                  title="Miehet"
                  onPress={() => selectDivision("Miehet")}
                />
                <List.Item
                  title="Tytöt"
                  onPress={() => selectDivision("Tytöt")}
                />
                <List.Item
                  title="Pojat"
                  onPress={() => selectDivision("Pojat")}
                />
              </List.Accordion>
              <List.Accordion
                title={chosenGame ? getGameTitle(chosenGame) : "Pelit"}
                style={style.search}
                theme={{
                  colors: { background: "#F9F9F9", primary: "#005C70" },
                }}
                expanded={gamesExpanded}
                onPress={() => setGamesExpanded(!gamesExpanded)}
              >
                {gameList}
              </List.Accordion>
            </List.Section>

            {/* LOHKOT JA PISTEIDEN SYÖTTÖ*/}
            {groups ? (
              <View style={{ flex: 1 }}>
                <FlatList
                  data={groups}
                  ItemSeparatorComponent={GroupSeparator}
                  renderItem={Group}
                  scrollEnabled={true}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Points;
