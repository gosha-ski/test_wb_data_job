для запуска приложения запустите по очереди

```
docker compose build
docker compose up
```

планировщик будет раз в час обращаться к wb за данными.
для выгрузки таблиц warehouses нужно отправить POST запрос(например через postman)

```
http://localhost:3000/load_data_to_google
```

```
Body:{
   ids: string[]
 }
```

ids - айдишники гугл таблиц, в которые идет выгрузка

тестовый аккаунт гугл с таблицами:
email: testspreadsheets9@gmail.com
password: 123qweRTY
