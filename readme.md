### dat-geomagnetic

Imports Earth magnetic field data values from www.swpc.noaa.gov every minute into dat

Uses the [`geomagnetic`](https://npmjs.org/package/geomagnetic) module

dat-geomagnetic works as a dat listen hook. first install dat

```
npm install -g dat
mkdir dat-geomagnetic-test
cd dat-geomagnetic-test
dat init # put in your info
npm install dat-geomagnetic # install the hook
```

then add the following hook to dat.json

``` json
"hooks": {
  "listen": "dat-geomagnetic"
}
```

then run `dat listen` and it should start importing

```
ʕ´•ᴥ•`ʔ
```
