import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styles from "./Search.module.css";
import { SearchIcon } from "@chakra-ui/icons";

const Search = ({ searchText, setSearchText, onEnterClick, inputRef }) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" className={styles.icon}>
        <SearchIcon color="#262626" />
      </InputLeftElement>
      <Input
        ref={inputRef}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={onEnterClick}
        className={styles.input}
        placeholder="Введите запрос"
      />
    </InputGroup>
  );
};

export default Search;
