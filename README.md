# qshop (quasar-shop)

# Forked from

Its forked from [quasar-shoping](https://github.com/mayur091193/quasar-shopping) Originally build by Mayur Patel. But has following things are missing. I tried my best to fix it. If you have any suggetions please let me know.

# New features / Missing in original repository

## Files Created / Moved / Split

| #   | Features          | Completed | Description                                                                                                                                      |
| --- | ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | .htaccess         | Yes       | Prevent SPA refresh issue                                                                                                                        |
| 2   | .env              | Yes       | Configuration files for development & Production. Used Extension [app-extension-dotenv](https://github.com/quasarframework/app-extension-dotenv) |
| 3   | Axios             | Yes       | Not an hardcoded data its fetching from .json from files /public/data                                                                            |
| 4   | Vue Store         | Yes       | Vue Store is used to save cart information                                                                                                       |
| 5   | Persistance State | Yes       | LocalStorage used to save state                                                                                                                  |
| 6   | Responsive        | WIP       | Menu, Sidebar is under process                                                                                                                   |
| 7   | Payment Gateway   | No        | Pending feature surely build it on priority                                                                                                      |
| 8   | Google Analytics  | Yes       | Added script and events                                                                                                                          |
| 9   | Protected Routes  | No        | Only allowed to registered user                                                                                                                  |
| 10  | Payment Gateway   | No        | Indian Payment Gateway                                                                                                                           |
| 11  | i18n              | No        | But surely going to use this feature                                                                                                             |

## General Information

1. Shipped with latest version of Quasar, Eslint, Prettier. (if you want to you view Eslint, Prettier files need to check initial commit then after the file will put in .gitignore).
2. Seprate Search bar component as its important, make it round border and clear icon. It will prove a game changer component so I pull out from layout.
3. Pincode section is shifted to toolbar with dialog.
4. Some files are splited and moved pleaes read the table above for more information.
5. Use of .env file for site settings such as store name & url to store vaiable such as site_name, default username, password. env.development & .env.production two seprate files are created. Thanks to [hawkeye64](https://github.com/quasarframework/app-extension-dotenv) for such nice extension.

# Feature Request

1. Persitance Storage
2. Login & Sigun up Modal
