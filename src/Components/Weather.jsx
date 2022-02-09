import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Text,
  Container,
  Flex,
  Image,
  VStack,
  HStack,
  Input,
  Button,
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
  const [description, setDescription] = useState("");
  const [dataDate, setDataDate] = useState("");
  const [icon, setIcon] = useState("");
  const [cityName, setCityName] = useState("");


  //variables para color mode
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("lightBlue", "darkGrey");
  const secondaryBg = useColorModeValue("yellow", "darkBlue");
  const secondaryFont = useColorModeValue("darkGrey", "yellow");
  const secondaryPlaceHolder = useColorModeValue("darkGrey", "darkBlue");
  const inputBg = useColorModeValue("white", "lightBlue");

  useEffect(() => {
    const apiKey = "bcfd5686f755cf00b3ab1ab84a7a7de7";
    const getWeather = (position) => {
      const { latitude, longitude } = position.coords;
      axios({
        method: "GET",
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=${apiKey}`,
      })
        .then((response) => {
          console.log(response)
          setDataWeather(response.data.main.temp);
          setDataFeels(response.data.main.feels_like);
          setPlaceName(response.data.name);
          setCountry(response.data.sys.country);
          setDescription(response.data.weather[0].description);
          setIcon(response.data.weather[0].icon); 
        })
        .catch((error) => {
          console.log(error);
        });
        
    };
    
    navigator.geolocation.getCurrentPosition(getWeather);
  }, []);

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

  const getWeatherByCityName = (cityName) => {
    const apiKey = "bcfd5686f755cf00b3ab1ab84a7a7de7";
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=es&units=metric&appid=${apiKey}`,
    })
      .then((response) => {
        setDataWeather(response.data.main.temp);
        setDataFeels(response.data.main.feels_like);
        setPlaceName(response.data.name);
        setCountry(response.data.sys.country);
        setDescription(response.data.weather[0].description);
        setIcon(response.data.weather[0].icon);
      })
      .catch((error) => console.log(error));
  };

    

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
            <Button onClick={toggleColorMode} boxShadow={"sm"}>
              🌓
            </Button>
            <InputGroup
              justifyContent={"center"}
              width={"40%"}
              height={"15%"}
              bg={inputBg}
              placeholder={secondaryPlaceHolder}
              borderRadius={"15"}
              
            >
              <Input
                justifyContent={"initial"}
                border={"none"}
                
                focusBorderColor="none"
                width={"80%"}
                height={"100%"}
                color={secondaryPlaceHolder}
                type={"search"}
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              ></Input>
              <InputRightElement marginBottom={"0"}>
                <Button
                  marginTop={"45%"}
                  size={"md"}
                  marginRight={"20%"}
                  bgColor={"transparent"}
                  onClick={() => {
                    getWeatherByCityName(cityName);
                  }}
                >
                  🌐
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text fontSize={"15px"}>{dataDate}</Text>
            <Text fontSize={"17px"} fontWeight={"semibold"}>
              {placeName}, {country}
            </Text>
            <HStack>
              <Text fontSize={"28px"} fontWeight={"bold"}>
                {Math.round(dataWeather)} °C
              </Text>
              <Image
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt="icon"
              ></Image>
            </HStack>
            <Text fontSize={"17px"}>
              Sensación Térmica: {Math.round(dataFeels)} °C
            </Text>
            <Text fontSize={"17px"}>
              {description.charAt(0).toUpperCase() + description.slice(1)}
            </Text>
          </VStack>
        </Flex>
      </Container>
    </Fragment>
  );
};
export default Weather;