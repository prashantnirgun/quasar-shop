# qshop (quasar-shop)

# Forked from

Its forked from [quasar-shoping](https://github.com/mayur091193/quasar-shopping) Originally build by Mayur Patel. But has following things are missing. I tried my best to fix it. If you have any suggetions please let me know.

# New features / Missing in original repository

## Features Completed List

| #   | Features                  | Completed | Description                                                                                                                                             |
| --- | ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | .htaccess                 | Yes       | Prevent SPA refresh issue                                                                                                                               |
| 2   | .env                      | Yes       | Configuration files for development & Production. Used Extension [app-extension-dotenv](https://github.com/quasarframework/app-extension-dotenv)        |
| 3   | Axios                     | Yes       | [Axios](https://github.com/axios/axios) for fetch request, Interceptors is used to handle token expairy.                                                |
| 4   | Vue Store                 | Yes       | Vue Store is used to save cart information                                                                                                              |
| 5   | Persistance State         | Yes       | [Persistance State](https://github.com/robinvdvleuten/vuex-persistedstate#readme) LocalStorage used to save state                                       |
| 6   | JWT Passport Strategy     | Yes       | [passport.js](http://www.passportjs.org/packages/passport-jwt/) is used to authenticate user.                                                           |
| 7   | Google Analytics          | Yes       | [Google Analytics](https://analytics.google.com/) added script and events                                                                               |
| 8   | Payment Gateway           | Yes       | [Instamojo](https://www.instamojo.com) Indian Payment Gateway which accept National and International Debit, Credit cards, UPI                          |
| 9   | Allow payment as Guest    | Yes       | User can shop and make payment without login or Signup ie as a guest                                                                                    |
| 10  | Multiple Shipping Address | Yes       | System allow to save multiple Shiping address to save for future use                                                                                    |
| 11  | Filter product            | Yes       | It auto detect the Unit and Price range and accordingly create filter options with a count to know how many items are listed in that particular option. |
| 12  | Mini Cart                 | Yes       | Mini Cart feature is available                                                                                                                          |
| 13  | User Profile              | Yes       | User can update his profile, Avatar, Change Password.                                                                                                   |
| 14  | Board                     | Yes       | [Trello Style Board](https://github.com/prashantnirgun/quasar-shop/projects/1) to get more info about the project                                       |
| 15  | Front Page Slider         | Yes       | Two sliders Hot Deal, New Arrival managed by backend Portal just tag the product and slider will get updated accordingly.                               |

## Features Not Completed or WIP List

| #   | Features                        | Completed | Description                                                                                       |
| --- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| 1   | Two factor Authentication       | No        | Need to build two factor authentification like OTP, recaptch or Human detection                   |
| 2   | Tax Summary Display             | No        | GST Taxes summary to displayed clearly                                                            |
| 3   | Shipping Charges                | No        | Shipping Charges Policy is not yet implemented                                                    |
| 4   | Protected Routes                | No        | Only allowed to registered user                                                                   |
| 5   | Product Search                  | No        | Product search is not yet build                                                                   |
| 6   | Ordered History                 | No        | Not yet build Order History                                                                       |
| 7   | Order Tracking                  | No        | Order Tracking feature is not yet Started                                                         |
| 8   | Order Cancellation              | No        | Needs to build this feature                                                                       |
| 9   | Order Refund                    | No        | Needs to build this feature, needs to decide refund policy                                        |
| 10  | Quick Bill                      | No        | For retail customer has more than 20 items to be purchased need some fast billing system like POS |
| 11  | Repeat Order                    | No        | Repeat order with some changes to avoid time wastages in adding product to cart                   |
| 12  | Ticketing, Support              | No        | Needs to build ticketing or support forum                                                         |
| 13  | Invoice PDF                     | No        | Invoice PDF Download is not yet Build                                                             |
| 14  | i18n                            | No        | But surely going to use this feature                                                              |
| 15  | Encrypt Local Storage           | No        | Need to encrypt local storage                                                                     |
| 16  | Front page Slider Customisation | No        | Need user to decide which banner and its sequesnse feature needs to build                         |
| 17  | Multiple Images of Product      | No        | Needs to modifiy backend to allow multiple images of the product                                  |
| 18  | Multiple Rate List              | No        | Feature different pricelist for different category of user's                                      |

## Mobile Features List

| #   | Features   | Completed | Description                                          |
| --- | ---------- | --------- | ---------------------------------------------------- |
| 1   | Responsive | WIP       | Menu, Sidebar is under process                       |
| 2   | Mobile     | WIP       | Need to fixed Cart, Login screen for Mobile devices. |

## General Information

1. Shipped with latest version of Quasar, Eslint, Prettier. (if you want to you view Eslint, Prettier files need to check initial commit then after the file will put in .gitignore).
2. Seprate Search bar component as its important, make it round border and clear icon. It will prove a game changer component so I pull out from layout.
3. Pincode section is shifted to toolbar with dialog.
4. Some files are splited and moved pleaes read the table above for more information.
5. Use of .env file for site settings such as store name & url to store vaiable such as site_name, default username, password. env.development & .env.production two seprate files are created. Thanks to [hawkeye64](https://github.com/quasarframework/app-extension-dotenv) for such nice extension.

![Shopping Cart](images/shopping-cart-flow.png =400x100)
