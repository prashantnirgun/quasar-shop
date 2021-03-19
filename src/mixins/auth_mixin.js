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
    },

    isUserAvailable(columnName, columnValue) {
      const URL = `user/availability?column_name=${columnName}&column_value=${columnValue}&company_id=${process.env.COMPANY_ID}`;

      return new Promise((resolve, reject) =>
        DataService.get(URL)
          .then(response => {
            //console.log('response received', response);
            if (parseInt(response.data.rows[0].count) == 0) {
              resolve(!!columnValue);
            } else {
              resolve('Already in used');
            }
          })
          .catch(error => {
            reject('* Required');
          })
      );
    }
  }
};
