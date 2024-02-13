import RouteToHome from "../RouteToHome/RouteToHome";
import styles from "./CatalogTitle.module.css";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import axiosInstance from "../../axios.config";
import AlertInfo from "../AlertInfo/AlertInfo";
import { addresses } from "../../mock/addresses";
import {
  availabilityFilterState,
  furnishersFilterState,
  sortState,
} from "../../storage/atoms";
import { sortedFurnishers } from "../../utils/sortedFurnishers";
import FurhishersFilter from "../FurnishersFilter/FurhishersFilter";
import AvailabilityFilter from "../AvailabilityFilter/AvailabilityFilter";
import sortIcon from "../../assets/sortIcon.svg";
import Image from "next/image";

const CatalogTitle = ({ title, isFurnishersPage, isAvailabilityPage }) => {
  const [furnishersState, setFurnishersState] = useState([]);
  const [isFurnishersOpen, setIsFurnishersOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [furnisherFilterArr, setFurnisherFilterArr] = useRecoilState(
    furnishersFilterState
  );
  const [availabilityFilter, setAvailabilityFilter] = useRecoilState(
    availabilityFilterState
  );
  const [sort, setSort] = useRecoilState(sortState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setFurnisherFilterArr([]);

    if (availabilityFilter) {
      const icon = document.getElementById("checkIcon-address");
      if (!icon) return;

      icon.style.opacity = "1";
    }
  }, []);

  useEffect(() => {
    const fetchFurnishers = async () => {
      try {
        const res = await axiosInstance.get("/furnishers");

        const result = sortedFurnishers(res.data);

        setFurnishersState(result);
      } catch (error) {
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    };

    fetchFurnishers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const popoverContent = document.querySelector(
        ".CatalogTitle_furnishersList__RHF9N"
      );
      const icons = document.querySelectorAll(".CatalogTitle_filter__di3tg");

      let clickedOnIcon = false;

      icons.forEach((icon) => {
        if (icon.contains(e.target)) {
          clickedOnIcon = true;
        }
      });

      if (
        popoverContent &&
        !popoverContent.contains(e.target) &&
        !clickedOnIcon
      ) {
        setIsFurnishersOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onChangeSort = () => {
    if (sort === "none") {
      setSort("up");
    } else if (sort === "up") {
      setSort("down");
    } else if (sort === "down") {
      setSort("none");
    }
  };

  const furnisherFilterAdd = (furnisherId, iconId) => {
    const icon = document.getElementById(iconId);
    const isAlready = furnisherFilterArr.find((e) => e === furnisherId);

    if (!icon) return;

    if (!isAlready) {
      setFurnisherFilterArr((prevState) => [...prevState, furnisherId]);
      icon.style.opacity = "1";
    } else {
      setFurnisherFilterArr((prevState) => {
        const arr = [...prevState];
        return arr.filter((item) => item !== furnisherId);
      });
      icon.style.opacity = "0";
    }
  };

  const availabilityFilterAdd = () => {
    const icon = document.getElementById("checkIcon-address");

    if (!icon) return;

    if (!availabilityFilter) {
      setAvailabilityFilter(true);
      icon.style.opacity = "1";
    } else {
      setAvailabilityFilter(false);
      icon.style.opacity = "0";
    }
  };

  const onFurnishersFilterOpen = () => {
    setIsAvailabilityOpen(false);
    setIsFurnishersOpen((prevState) => !prevState);
  };
  const onAvailabilityFilterOpen = () => {
    setIsFurnishersOpen(false);
    setIsAvailabilityOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.searchText}>{title}</span>
        {router.asPath !== "/kitchensToOrder" ? <RouteToHome /> : null}
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.sort}>
          {screenWidth > 400 ? (
            <span className={styles.text}>Cортировка</span>
          ) : null}
          <div className={styles.btn} onClick={onChangeSort}>
            <Image src={sortIcon} alt="sortIcon" />
            <span className={styles.text}>По цене</span>
            <TriangleDownIcon
              className={`${styles.filterIcon} ${
                sort === "up"
                  ? styles.up
                  : sort === "none"
                  ? styles.displayNone
                  : null
              }`}
            />
          </div>
        </div>
        {!isFurnishersPage ? (
          <FurhishersFilter
            furnishersState={furnishersState}
            onFurnishersFilterOpen={onFurnishersFilterOpen}
            isFurnishersOpen={isFurnishersOpen}
            furnisherFilterAdd={furnisherFilterAdd}
          />
        ) : null}
        {!isAvailabilityPage ? (
          <AvailabilityFilter
            addresses={addresses}
            onAvailabilityFilterOpen={onAvailabilityFilterOpen}
            isAvailabilityOpen={isAvailabilityOpen}
            availabilityFilterAdd={availabilityFilterAdd}
          />
        ) : null}
      </div>
      {reqError && (
        <AlertInfo
          title="Произошла ошибка:"
          description={reqError}
          type="error"
        />
      )}
    </div>
  );
};

export default CatalogTitle;
