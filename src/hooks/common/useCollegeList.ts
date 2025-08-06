import { useEffect, useState } from "react";

type CollegeItem = {
  Name: string;
  [key: string]: unknown;
};

const useCollegeList = () => {
  const [collegeList, setCollegeList] = useState<string[]>([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/ItsUjjwalGoel/College_List/main/College_List.json'
        );
        const data = await res.json();
        const names = data['All institutes'].map((item: { Name: string }) => item.Name);
        setCollegeList(names);
      } catch (err) {
        console.error("Failed to fetch college list", err);
      }
    };

    fetchColleges();
  }, []);

  return collegeList;
};

export default useCollegeList;
