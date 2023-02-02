import * as React from 'react';
import { DataTable as PaperTable }  from 'react-native-paper';


//Tämä testikomponentti toimii puhtaassa sovelluksessa, mutta ei tässä.

const optionsPerPage = [2, 3, 4];

const DataTable = () => {
  const [page, setPage] = React.useState(0)
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <PaperTable>
      <PaperTable.Header>
        <PaperTable.Title>Dessert</PaperTable.Title>
        <PaperTable.Title numeric>Calories</PaperTable.Title>
        <PaperTable.Title numeric>Fat</PaperTable.Title>
      </PaperTable.Header>

      <PaperTable.Row>
        <PaperTable.Cell>Frozen yogurt</PaperTable.Cell>
        <PaperTable.Cell numeric>159</PaperTable.Cell>
        <PaperTable.Cell numeric>6.0</PaperTable.Cell>
      </PaperTable.Row>

      <PaperTable.Row>
        <PaperTable.Cell>Ice cream sandwich</PaperTable.Cell>
        <PaperTable.Cell numeric>237</PaperTable.Cell>
        <PaperTable.Cell numeric>8.0</PaperTable.Cell>
      </PaperTable.Row>

      <PaperTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </PaperTable>
  );
}

export default DataTable;