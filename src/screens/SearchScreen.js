import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = price => {
    let resArr = [];
    for (var variable in results) {
      if (results[variable].price) {
        let str = results[variable].price;
        str.length === price.length ? resArr.push(variable.price) : "";
      }
    }
    console.log(resArr[1]);
    return resArr;
  };

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>We have found {results.length} results</Text>
      {results.length > 0 && (
        <>
          <ResultsList
            results={filterResultsByPrice("€")}
            title="Cost Effective"
          />
          <ResultsList
            results={filterResultsByPrice("€€")}
            title="Bit Pricier"
          />
          <ResultsList
            results={filterResultsByPrice("€€€")}
            title="Big Spender"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
