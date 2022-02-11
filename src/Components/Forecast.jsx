import React, { Fragment } from "react";
import { VStack, Text, Image, Flex } from "@chakra-ui/react";

const Forecast = ({ eachHour }) => {
  const timeForecast = () => {
    let date = new Date(eachHour.dt_txt);
    let hours = date.getHours();
    return hours;
  };

  return (
    <Fragment>
      <Flex>
        <VStack flexDirection={"column"}>
          <Image
            src={`http://openweathermap.org/img/w/${eachHour.weather[0].icon}.png`}
            alt="icon"
          ></Image>
          <Text>{Math.round(eachHour.main.temp)} °C</Text>
          {timeForecast() > 12 ? (
            <Text>{timeForecast() - 12}pm</Text>
          ) : (
            <Text>{timeForecast()}am</Text>
          )}
        </VStack>
      </Flex>
    </Fragment>
  );
};

export default Forecast;
