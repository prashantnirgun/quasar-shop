import DataService from 'src/services/DataService';

export default {
  methods: {
    isUniqueName(table, id, columnName, columnValue) {
      const URL = `validate/${table}/${id}?column_value=${columnValue}&column_name=${columnName}`;

      return new Promise((resolve, reject) =>
        DataService.get(URL)
          .then(response => {
            if (parseInt(response.data.rows[0].count) == 0) {
              resolve(!!columnValue || '* Required');
            } else {
              resolve('Duplicate');
            }
          })
          .catch(error => {
            reject('* Required');
          })
      );
    }
  }
};
