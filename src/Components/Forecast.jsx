import React, { Fragment } from "react";

import { VStack, Text, Image, Flex } from "@chakra-ui/react";

const Forecast = ({ eachHour }) => {
 /*  const time = new Date(eachHour.dt).toLocaleDateString("es-ES", {
    weekday: "long",
  }); */


  
const time = () => {
  let date = new Date((eachHour.dt)*1000);
  let weekDay = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
  }).format(date);
  return weekDay
}

  return (
    <Fragment>
      <Flex>
        <VStack flexDirection={"column"}>
          <Image
            src={`http://openweathermap.org/img/w/${eachHour.weather[0].icon}.png`}
            alt="icon"
          ></Image>
          <Text>{Math.round(eachHour.main.temp)} °C</Text>
          <Text>{time()}</Text>
        </VStack>
      </Flex>
    </Fragment>
  );
};

export default Forecast;
