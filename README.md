# qshop (quasar-shop)

# Forked from :

Its forked from [quasar-shoping](https://github.com/mayur091193/quasar-shopping) Originally build by Mayur Patel. But has following things are missing. I tried my best to fix it. If you have any suggetions please let me know.

# New features / Missing in original repository :

## Files Created / Moved / Split :

| Object  | File Name    | Description                                                                                                                               |
| ------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| layouts | MyLayout.vue | (1) Layout.vue no reason I just like to make it simple & split the code into seprate files. (2) Menu.vue (3) Footer.vue (4) SearchBar.vue |
| pages   | home.vue     | (1) Moved and renamed component/home/Index.vue folder & created two sepate files (2) Hot-deal.vue (3) banner.vue                          |

## General Information :

1. Shipped with latest version of Quasar, Eslint, Prettier. (if you want to you view Eslint, Prettier files need to check initial commit then after the file will put in .gitignore).
2. Seprate Search bar component as its important, make it round border and clear icon. It will prove a game changer component so I pull out from layout.
3. Pincode section is shifted to toolbar with dialog.
4. Some files are splited and moved pleaes read the table above for more information.
5. Use of .env file for site settings such as store name & url to store vaiable such as site_name, default username, password. env.development & .env.production two seprate files are created. Thanks to [hawkeye64](https://github.com/quasarframework/app-extension-dotenv) for such nice extension.

# Feature Request

1. Persitance Storage
2. Login & Sigun up Modal
