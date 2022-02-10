import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { WEATHER_KEY } from '../keys';
import {Search2Icon, SunIcon} from "@chakra-ui/icons"
import {
  Text,
  Container,
  Flex,
  Image,
  VStack,
  HStack,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const Weather = () => {
  const [dataWeather, setDataWeather] = useState("");
  const [dataFeels, setDataFeels] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [country, setCountry] = useState("");
  const [dataDate, setDataDate] = useState("");
  const [icon, setIcon] = useState("");
  const [cityName, setCityName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");



  const forecastData = (latitude, longitude) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=${WEATHER_KEY}`,
    })
    .then((response)=> console.log('forecast',response))
  }


  useEffect(() => {
    const getWeather = (position) => {
      const { latitude, longitude } = position.coords; //se extrae latitud y longitud de coords
      
      axios({
        method: "GET",
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=${WEATHER_KEY}`,
      })
        .then((response) => {
          console.log(response)
          setDataWeather(response.data.main.temp);
          setDataFeels(response.data.main.feels_like);
          setPlaceName(response.data.name);
          setCountry(response.data.sys.country);
          setIcon(response.data.weather[0].icon);
          setHumidity(response.data.main.humidity);
          setPressure(response.data.main.pressure);
          setLatitude(response.data.coord.lat)
          setLongitude(response.data.coord.lon)
          
        })
        .catch((error) => {
          console.log(error);
        });
       forecastData(latitude, longitude) 
    };    
    navigator.geolocation.getCurrentPosition(getWeather);
  }, []);

  
 
  const getWeatherByCityName = (cityName) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=es&units=metric&appid=${WEATHER_KEY}`,
    })
      .then((response) => {
        console.log('by city', response)
        setDataWeather(response.data.main.temp);
        setDataFeels(response.data.main.feels_like);
        setPlaceName(response.data.name);
        setCountry(response.data.sys.country);
        setIcon(response.data.weather[0].icon);
        setHumidity(response.data.main.humidity);
        setPressure(response.data.main.pressure);
        setLatitude(response.data.coord.lat)
        setLongitude(response.data.coord.lon)
      })
      .catch((error) => console.log(error));
      
  };


  

  //Función para fecha
  useEffect(() => {
    const getDate = () => {
      let date = new Date();
      let weekDay = new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
      }).format(date);
      let month = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
        date
      );
      return `${weekDay}, ${("0" + date.getDate()).slice(-2)} de ${
        month /* ("0" +(date.getMonth() + 1)).slice(-2) */
      } de ${date.getFullYear()}`;
    };
    setDataDate(getDate());
  }, []);


  //variables para color mode
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("lightBlue", "darkerGrey");
  const secondaryBg = useColorModeValue("lightGrey", "darkGrey");
  const secondaryFont = useColorModeValue("darkGrey", "white");
  const secondaryPlaceHolder = useColorModeValue("darkGrey", "darkBlue");
  const inputBg = useColorModeValue("white", "lightBlue");


  return (
    <Fragment>
      <Container maxWidth="container.lg.xl" p={"0"} bgColor={bgColor}>
        <Flex h="100vh" alignItems="center" justifyContent={"center"}>
          <VStack
            w={"60%"}
            h={"60%"}
            boxShadow={"md"}
            background={secondaryBg}
            borderRadius={"20px"}
            alignItems="center"
            justifyContent={"center"}
            color={secondaryFont}
          >
            <Flex>
            <HStack alignContent={"center"} justifyContent={"center"}>
           
            <InputGroup
              justifyContent={"center"}
              width={"70%"}
              height={"100%"}
              bg={inputBg}
              placeholder={secondaryPlaceHolder}
              borderRadius={"20"}
              
            >
              <Input
                justifyContent={"initial"}
                border={"none"}
                focusBorderColor="none"
                width={"90%"}
                height={"90%"}
                marginTop={"1.5%"}
                color={secondaryPlaceHolder}
                type={"search"}
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              ></Input>
              <InputRightElement _pressed={"none"}>
              <IconButton onClick={() => {
                    getWeatherByCityName(cityName);
                    forecastData(latitude, longitude);
                  }} bgColor={"transparent"} isRound={true }  icon={<Search2Icon />} ></IconButton>
              </InputRightElement>
            </InputGroup>
            <IconButton onClick={toggleColorMode} size={"md"} isRound={true} boxShadow={"sm"} icon={<SunIcon />}>
              
              </IconButton>
            </HStack>
            </Flex>
            <Text fontSize={"15px"} fontWeight={"hairline"}>{dataDate}</Text>
            <Text fontSize={"17px"} fontWeight={"semibold"}>
              {placeName}, {country}
            </Text>
            <HStack>
              <Text fontSize={"30px"} fontWeight={"extrabold"} fontFamily={"Roboto, sans-serif"}>
                {Math.round(dataWeather)} °C
              </Text>
              <Image
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt="icon"
              ></Image>
            </HStack>
            <Text fontSize={"15px"} marginTop={"0"}>
              Sensación Térmica: {Math.round(dataFeels)} °C
            </Text>
           {/*  <Text fontSize={"15px"}>
              {description.charAt(0).toUpperCase() + description.slice(1)}
            </Text> */}
            <Text fontSize={"14px"}>Humedad: {humidity}%</Text>
            <Text fontSize={"14px"}>Presión Atmosférica: {pressure/1000} mbar</Text>
          </VStack>
        </Flex>
      </Container>
    </Fragment>
  );
};
export default Weather;