import { date } from 'quasar';

export default {
  methods: {
    popupMessage(action, message, position = 'bottom') {
      this.$q.notify({
        type: action,
        position,
        message: message
      });
    },
    mysqlDate(value) {
      var parts = value.split('-');
      //expecting dd-mm-yyyy
      return date.formatDate(
        new Date(parts[2], parts[1] - 1, parts[0]),
        'YYYY-MM-DD'
      );
    },
    currency_f(value, symbol = false) {
      if (symbol) {
        return value.toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          style: 'currency',
          currency: 'INR'
        });
      } else {
        return Number(value)
          .toFixed(2)
          .replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
      }
    },
    number_f(value) {
      return Number(value).toLocaleString();
    },
    price_in_words(price) {
      var sglDigit = [
          'Zero',
          'One',
          'Two',
          'Three',
          'Four',
          'Five',
          'Six',
          'Seven',
          'Eight',
          'Nine'
        ],
        dblDigit = [
          'Ten',
          'Eleven',
          'Twelve',
          'Thirteen',
          'Fourteen',
          'Fifteen',
          'Sixteen',
          'Seventeen',
          'Eighteen',
          'Nineteen'
        ],
        tensPlace = [
          '',
          'Ten',
          'Twenty',
          'Thirty',
          'Forty',
          'Fifty',
          'Sixty',
          'Seventy',
          'Eighty',
          'Ninety'
        ],
        handle_tens = function(dgt, prevDgt) {
          return 0 == dgt
            ? ''
            : ' ' + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
        },
        handle_utlc = function(dgt, nxtDgt, denom) {
          return (
            (0 != dgt && 1 != nxtDgt ? ' ' + sglDigit[dgt] : '') +
            (0 != nxtDgt || dgt > 0 ? ' ' + denom : '')
          );
        };

      var str = '',
        digitIdx = 0,
        digit = 0,
        nxtDigit = 0,
        words = [];
      if (((price += ''), isNaN(parseInt(price)))) str = '';
      else if (parseInt(price) > 0 && price.length <= 10) {
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
          switch (
            ((digit = price[digitIdx] - 0),
            (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
            price.length - digitIdx - 1)
          ) {
            case 0:
              words.push(handle_utlc(digit, nxtDigit, ''));
              break;
            case 1:
              words.push(handle_tens(digit, price[digitIdx + 1]));
              break;
            case 2:
              words.push(
                0 != digit
                  ? ' ' +
                      sglDigit[digit] +
                      ' Hundred' +
                      (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                        ? ' and'
                        : '')
                  : ''
              );
              break;
            case 3:
              words.push(handle_utlc(digit, nxtDigit, 'Thousand'));
              break;
            case 4:
              words.push(handle_tens(digit, price[digitIdx + 1]));
              break;
            case 5:
              words.push(handle_utlc(digit, nxtDigit, 'Lakh'));
              break;
            case 6:
              words.push(handle_tens(digit, price[digitIdx + 1]));
              break;
            case 7:
              words.push(handle_utlc(digit, nxtDigit, 'Crore'));
              break;
            case 8:
              words.push(handle_tens(digit, price[digitIdx + 1]));
              break;
            case 9:
              words.push(
                0 != digit
                  ? ' ' +
                      sglDigit[digit] +
                      ' Hundred' +
                      (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2]
                        ? ' and'
                        : ' Crore')
                  : ''
              );
          }
        str = words.reverse().join('');
      } else str = '';
      return str;
    }

    // localDate: val =>
    //   val.toLocaleString('en-IN', {
    //     maximumFractionDigits: 2,
    //     style: 'currency',
    //     currency: 'INR'
    //   })
  },
  computed: {}
};
