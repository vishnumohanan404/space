import { useState, useRef } from "react";
import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import useDebounce from "../../hooks/debounceHook";
import axios from "axios";
import SearchResult from "../SearchResult";
import useClickOutside from "../../hooks/clickOutsideHook";

export default function SearchBar() {
  const [isExpanded, setExpanded] = useState(false);
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [noTvShows, setNoTvShows] = useState(false);

  let parentRef = useClickOutside(() => {
    collapseContainer();
  });

  const isEmpty = !tvShows || tvShows.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoTvShows(false);
    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setTvShows([]);
    setNoTvShows(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const prepareSearchQuery = (query) => {
    const friendSearchUrl = `${process.env.REACT_APP_API_URL}/search?q=${query}`;
    return encodeURI(friendSearchUrl);
  };

  const searchFriends = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);
    setNoTvShows(false);
    const URL = prepareSearchQuery(searchQuery);
    const response = await axios.get(URL).catch((err) => {});
    if (response) {
      if (response.data && response.data.length === 0) setNoTvShows(true);
      setTvShows(response.data);
    }
    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchFriends);

  return (
    <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder="Search for friends"
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={collapseContainer}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeparator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color="#000" size={20} />
            </LoadingWrapper>
          )}
          {!isLoading && isEmpty && !noTvShows && (
            <LoadingWrapper>
              <WarningMessage>Start typing to search</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && noTvShows && (
            <LoadingWrapper>
              <WarningMessage>No friends found</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && !isEmpty && (
            <>
              {tvShows.map((show) => {
                console.log("Show: ", show);
                return (
                  <SearchResult
                    key={show?._id}
                    id={show?._id}
                    thumbnailSrc={show?.avatar && show?.avatar}
                    name={show?.fullName}
                    rating={show?.rating && show?.rating.average}
                    collapseContainer={collapseContainer}
                  />
                );
              })}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 30em;
  height: 2.8em;
  margin: 0.5em;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 2px 12px 3px rgba(121, 121, 121, 0.103);
  @media only screen and (min-width: 400px) {
    width: 16em;
    margin-left: 0;
    margin-right: 0;
  }
  @media only screen and (min-width: 768px) {
    width: 20em;
  }
  @media only screen and (min-width: 992px) {
    width: 30em;
  }
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  border-radius: 6px;
  font-weight: 500;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  margin-top: 6px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeparator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d828;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "20em",
  },
  collapsed: {
    height: "2.8em",
  },
};

const containerTransition = {
  type: "spring",
  damping: 22,
  stiffness: 150,
};
