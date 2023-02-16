import { Text, View, Pressable, ImageBackground, FlatList} from "react-native";
import React, { useState, useEffect } from "react";
import { style } from "../styles/styles";
import * as Icon from "react-native-feather";
import { List, TextInput, HelperText } from "react-native-paper";

import { formatDMYtoYMD } from "../scripts/myDate";

import { database, placement_ref, PLAYER_REF } from "../firebase/Config";
import { onValue, ref, update, child, push, query, equalTo, orderByChild } from "firebase/database";
import { ScrollView } from "react-native-gesture-handler";

import PointsSnackbar from "./pointsComponents/PointsSnackbar";
import { SafeAreaView } from "react-native";

const backgroundImage = require("../assets/Volleyball100.png");

function Points({ navigation }) {
  const [division, setDivision] = useState();
  const [divisionsExpanded, setDivisionsExpanded] = useState(false);
  const [gamesToShow, setGamesToShow] = useState([]);
  const [chosenGame, setChosenGame] = useState();
  const [gamesExpanded, setGamesExpanded] = useState(false);
  const [enrolledPlayers, setEnrolledPlayers] = useState();
  const [groups, setGroups] = useState();
  const [game, setGame] = useState();
  const [bonusMultiplier, setBonusMultiplier] = useState();
  const [dbPlacement, setDbPlacement] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Players and enrolments from the database
  const [player, setPlayer] = useState([]);
  const [enrolment, setEnrolment] = useState();

  const year = new Date().getFullYear();

  // Collects game information from firebase database
  useEffect(() => {
    const games = query(ref(database, "game/"), orderByChild("isEvent"), equalTo(false));
    onValue(games, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const gameItems = { ...data };
      const parse = JSON.parse(JSON.stringify(gameItems));
      const keys = Object.keys(parse);
      let parseKeys = Object.values(parse);
      console.log("parseKeys", parseKeys);
      parseKeys.forEach((element, i) => {
        (!Number.isInteger(element.id)) ? element.id = keys[i] : null;
      });
      parseKeys = parseKeys.map((i) => {
          i.date = new Date(formatDMYtoYMD(i.date));
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
    const players = ref(database, PLAYER_REF);
    onValue(players, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const playerItems = { ...data };
      const parse = JSON.parse(JSON.stringify(playerItems));
      const keys = Object.keys(parse)
      let parseKeys = Object.values(parse)
      parseKeys.forEach((element, i) => {
        (!Number.isInteger(element.id)) ? element.id = keys[i] : null;
      });
      parseKeys = parseKeys.map((e) => {
        e.ranking = e.ranking[2023] ? e.ranking : {2023: e.ranking};
        return e;
      })
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
      const keys = Object.keys(parse)
      let parseKeys = Object.values(parse)
      /* parseKeys.forEach((element, i) => {
        delete Object.assign(parseKeys, {[keys[i]]: parseKeys[i] });
      }); */
      parseKeys.forEach((element, i) => {
        element.id = keys[i];
      });
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
  
  // Collects placement information from firebase database
  const pullExistingPlacements = () => {
    const placement = ref(database, placement_ref + "/" + new Date().getFullYear() + "/" + chosenGame.id);
    onValue(placement, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const placementItems = { ...data };
      const parse = JSON.parse(JSON.stringify(placementItems));
      let parseKeys = Object.values(parse)
      setDbPlacement(parseKeys);
    });
  }

  useEffect(() => {
    console.log("dbPlacement", dbPlacement, " enrolledPlayers", enrolledPlayers);
    dbPlacement !== [] ? groupPlayers() : null;
  }, [dbPlacement])
  
  useEffect(() => {
    gameList = mapGames();
  }, [gamesToShow]);
  
  useEffect(() => {
    filterGames();
  }, [division]);

  useEffect(() => {
    filterEnrolments();
    chosenGame ? pullExistingPlacements() : null;
  }, [chosenGame]);

  useEffect(() => {
    groupPlayers();
  }, [enrolledPlayers]);

  const selectDivision = (div) => {
    setDivisionsExpanded(!divisionsExpanded);
    setDivision(div);
  };

  // When a division is chosen a new gamesToShow array is filtered from the game table.
  const filterGames = () => {
    if (division) {
      const newGamesToShow = game.filter((i) => i.division === division);
      setGamesToShow(newGamesToShow);
    }
  };

  const selectGame = (game) => {
    setGamesExpanded(!gamesExpanded);
    setChosenGame(game);
  };

  const getGameTitle = (game) => {
    game.date = new Date(game.date);
    return (
      game.division +
      " " +
      game.date.getDate() +
      "." +
      (game.date.getMonth() + 1) +
      "." +
      game.date.getFullYear()
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
    console.log("chosenGame: ", chosenGame);
    console.log("enrolment: ", enrolment);
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
            enrolmentsToChosenGame.find((j) => j.player_id == i.id)
          )
          .sort((a, b) => {
            console.log('a.orderNumber', a.orderNumber);
            if (a.orderNumber) return b.orderNumber - a.orderNumber
            else return b.ranking[year] - a.ranking[year]
          })
        )
      : null;
    //newEnrolledPlayers ? console.log("newEnrolledPlayers:", newEnrolledPlayers) : null
    newEnrolledPlayers ? setEnrolledPlayers(newEnrolledPlayers) : null;
    newEnrolledPlayers ? console.log("newEnrolledPlayers: ", newEnrolledPlayers) : null;
  };

  //Flatlist components and functions

  //RenderItem for the main FlatList that renders the groups.
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
  
  // Give Separator component styles to affect how flatlist Items are separated from each other.
  const GroupSeparator = () => {
    <View style={style.groupSeparator}></View>;
  };

  const handleScoreChange = (points, round, group) => {
    //update points to groups.
    let newGroups = groups.concat();

    //Check if user has typed in an entire number instead of "." or "-";
    if (Number(points) && !checkScoreInput(points)) {
      newGroups[group] = newGroups[group].reduce(
        (newGroup, player, playerNumber) => {
          // Player 1 and their pair gets points and the opposing players get points in negative.
          // Pairs change on each round so different conditions need to be taken into consiredation.
          player.scores[round] =
            playerNumber == 0 ||
            (round == 0 && playerNumber == 3) ||
            (round == 1 && playerNumber == 2) ||
            (round == 2 && playerNumber == 1)
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
      //console.log("newGrouops:", newGroups);
      //newGroups[group].scores ? console.log("newGroups[group].scores.length", newGroups[group].scores.length) : null;
      if (newGroups[group][0].scores
          && newGroups[group][0].scores.length > 2
          && newGroups[group][0].scores.every(e => Number.isInteger(e))
          && !newGroups[group][0].scores.includes(undefined)) {
        newGroups = countRankingScoresByGroup(newGroups, group)
        saveResultsToDB(newGroups, group);
      } 
    } else {
      //Save the incomplete input into the groups.
      newGroups[group][0].scores[round] = points;
    }
    setGroups(newGroups);
  };

  // Send results to the database.
  const saveResultsToDB = (groups, groupNumber) => {
    groups[groupNumber].forEach(player => {
      const previousPlacement = dbPlacement.find(e => {
        return e.player_id === player.id;
      })
      const placementKey = previousPlacement ? previousPlacement.id : push(child(ref(database), placement_ref)).key;
      const newPlacement = {
        "id": placementKey,
        "game_id": chosenGame.id,
        "sum": player.sum,
        "ranking": player.resultRanking,
        "player_id": player.id,
        "group": groupNumber,
        "scores": player.scores,
        "orderNumber": player.orderNumber,
        "playerName": player.name
      }
      const updates = {};
      updates[placement_ref + "/" + new Date().getFullYear() + "/" + chosenGame.id + "/" + placementKey] = newPlacement;
      update(ref(database), updates).then(() => {
        setShowSnackbar(true);
      })
        .catch((error) => {
          console.log("error: ", error.message);
          throw new Error('Error: ', error.message);
        });
    });
  }

  // Counts the ranking scores each player, without changing their order in the groups.player array.
  // This could be changed to only happen when the user submits the scores to the database to improve performance of the list,
  // since the product owner doesn't see need to show the ranking scores in this view.
  const countRankingScoresByGroup = (groups, groupNumber) => {
    let temp = JSON.parse(JSON.stringify(groups));
    temp[groupNumber] = temp[groupNumber].sort((a, b) => b.sum - a.sum);
    temp[groupNumber].reduce((group, player, i) => {
      //base points first:
      player.resultRanking = 15.5 + 0.5 * (1 - (i + 1)) - (groupNumber + 1) / 2;
      //bonus points:
      player.resultRanking +=
        ((player.sum + 63) / 252) *
        (50 - (groupNumber + 1) - 1 * bonusMultiplier);
      player.resultRanking = Math.round(player.resultRanking * 100) / 100;
      group.push(player);
      return group;
    }, []);
    console.log("groups in scores", groups);

    let newGroups = groups.concat();

    newGroups[groupNumber] = groups[groupNumber].reduce((group, player) => {
      player.resultRanking = temp[groupNumber].find(
        (e) => player.name === e.name
      ).ranking;
      group.push(player);
      return group;
    }, []);

    return newGroups;
  };

  //this makes sure that the order of the players in the groups doesn't change when rankings change after the games have been played.
  const orderPlayers = () => {
    console.log("enrolledPlayers", enrolledPlayers);
    let newPlayers = enrolledPlayers.length > 0 ? enrolledPlayers.reduce((players, player, i) => {
      const previousPlacement = dbPlacement.find(e => {
        return e.player_id === player.id;
      })
      console.log("players,", players, " player", player);
      player.orderNumber = previousPlacement ? previousPlacement.orderNumber : i;
      players.push(player)
      return players
    }, [])
    .sort((a, b) => {
      console.log("a.orderNumber", a.orderNumber, "b.orderNumber", b.orderNumber);
      if (a.orderNumber != null) {return (a.orderNumber - b.orderNumber)}
            else return 0
    })
    : enrolledPlayers;
    console.log("SORTED PLAYERS", newPlayers);
    return newPlayers;
  }
  
  //divides the players in to groups of 4. Uncomment the commented console logs to see what this does.
  const groupPlayers = () => {
    //console.log(enrolledPlayers);
    const newGroups = enrolledPlayers
    ? orderPlayers().reduce((groups, player, i) => {
      let j = Math.floor(i / 4);
      groups[j] = groups[j] || [];
      player = addScoringVariablesToPlayer(player, i, j);
      groups[j].push(player);
      return groups;
    }, [])
    : null;
    console.log("newGroups: ", newGroups);
    setGroups(newGroups);
  };
  
  const addScoringVariablesToPlayer = (player, i, j) => {
    //Gives the player objects, scores, sum and ranking keys, for calculating and submitting competition results.
    console.log("preieri:", player);
    const previousPlacement = dbPlacement.find(e => {
      return e.player_id === player.id;
    })
    player.orderNumber = previousPlacement ? previousPlacement.orderNumber : i;
    player.scores = previousPlacement ? previousPlacement.scores : [];
    player.sum = previousPlacement ? previousPlacement.sum : null;
    player.resultRanking = previousPlacement ? previousPlacement.resultRanking : null;
    //These last two are given to make the nested FlatList management easier.
    player.group = previousPlacement ? previousPlacement.group : j;
    return player;

  };

  const checkScoreInput = (value) => {
    if (value >= -21 && value <= 21) {
      return false;
    }
    return true;
  }

  //RenderItem for the FlatList inside the Group component
  const Player = ({ item }) => {
    return (
      <View>
        {item.orderNumber % 4 == 0 ? (
          <>
            <HelperText type="error" visible={(checkScoreInput(item.scores[0]) || checkScoreInput(item.scores[1]) || checkScoreInput(item.scores[2]))}>
              Syötä laillinen pistemäärä -21 ja 21 väliltä.
            </HelperText>
            <View style={style.playerContainer}>
              <Text style={style.pointTexts}>{item.name}</Text>
            </View>
          </>
        ) : (
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={style.playerContainer}>
              <View style={style.playerScoresContainer}>
              <Text style={style.pointTexts}>{item.name}</Text>
                <View style={style.playerScoreRow}>
                  <Text style={style.pointTexts}>{item.scores[0]}</Text>
                  <Text style={style.pointTexts}>{item.scores[1]}</Text>
                  <Text style={style.pointTexts}>{item.scores[2]}</Text>
                </View>
              </View>
            </View>
            <View style={[style.rankingNumber, {marginLeft: 10, marginTop: 0}]}>
              <Text style={style.text}>{item.sum}</Text>
            </View>
          </View>
        )}
        
        {/* Checks if the player of this iteration is the first player of the group and if they are, returns textInputs. */}
        {item.orderNumber % 4 == 0 ? (
          <View style={style.playerScoresContainer}>
            <TextInput
              style={style.numInput}
              underlineColor={"#1B1B1B"}
              activeUnderlineColor={"#005C70"}
              value={item.scores[0] ? item.scores[0].toString() : ""}
              error={checkScoreInput(item.scores[0] ? item.scores[0].toString() : "")}
              keyboardType={"number-pad"}
              onChangeText={(value) => handleScoreChange(value, 0, item.group)}
              label={"Erä 1"}
            />
            <TextInput
              style={style.numInput}
              underlineColor={"#1B1B1B"}
              activeUnderlineColor={"#005C70"}
              value={item.scores[1] ? item.scores[1].toString() : ""}
              error={checkScoreInput(item.scores[1] ? item.scores[1].toString() : "")}
              keyboardType={"number-pad"}
              onChangeText={(value) => handleScoreChange(value, 1, item.group)}
              label={"Erä 2"}
            />
            <TextInput
              style={style.numInput}
              underlineColor={"#1B1B1B"}
              activeUnderlineColor={"#005C70"}
              value={item.scores[2] ? item.scores[2].toString() : ""}
              error={checkScoreInput(item.scores[2] ? item.scores[2].toString() : "")}
              keyboardType={"number-pad"}
              onChangeText={(value) => handleScoreChange(value, 2, item.group)}
              label={"Erä 3"}
            />
            {/* ranking score: */}
            <View style={[style.rankingNumber]}>
              <Text style={style.text}>{item.sum}</Text>
            </View>
          </View>
        ) : null }
      </View>
    );
  };

  const PlayerSeparator = () => {
    <View style={style.playerSeparator}></View>;
  };
  
  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <SafeAreaView style={[{ flexDirection: "column" }, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <View style={style.header}>
            <Pressable style={({pressed})=>[{opacity: pressed ? 0.6 : 1,},style.iconsEllipse]} onPress={() => navigation.navigate("Home")}>
              <View>
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
              {/* Division selection */}
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
              {/* Game selection */}
              <List.Accordion
                title={chosenGame ? getGameTitle(chosenGame) : "Pelit"}
                style={style.search}
                theme={{
                  colors: { background: "#F9F9F9", primary: "#005C70" },
                }}
                expanded={gamesExpanded}
                onPress={() => setGamesExpanded(!gamesExpanded)}
              >
                <ScrollView style={{ maxHeight: "75%" }}>{gameList}</ScrollView>
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
        <PointsSnackbar props={{showSnackbar, setShowSnackbar}}/>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Points;
