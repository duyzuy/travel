"use client";
import React, { memo, useState, useMemo } from "react";
import { FlagEn, FlagVi } from "@/assets/icons";
import styles from "./languageSwitcher.module.scss";
import { LanguageType } from "@/Models/language";
import { useRouter, usePathname } from "next/navigation";
import LoadingLangComponent from "./LoadingLangComponent";
import { getLangeCode } from "@/utils/helper";
import LanguageConponent from "./LanguageConponent";
type PropsType = {
  className?: string;
  children?: React.ReactNode;
};

const LANGUAGES: LanguageType[] = [
  {
    id: "tiengviet",
    name: "Tiếng Việt",
    shortName: "VN",
    url: FlagVi,
    code: "vi-VN",
  },
  {
    id: "tienganh",
    name: "English",
    shortName: "EN",
    url: FlagEn,
    code: "en-US",
  },
];
const LanguageSwitcher: React.FC<PropsType> = ({ className }) => {
  const pathname = usePathname();

  const [currentLanguage, setCurrentLange] = useState(() => {
    const langCode = getLangeCode(pathname);

    return LANGUAGES.find((lang) => lang.code === langCode);
  });

  const router = useRouter();
  const clx = useMemo(() => {
    let cls = "relative";
    if (className) {
      cls = cls.concat(" ", className);
    }
    return cls;
  }, [className]);

  //GET CURRENT LANGE

  const handleSwitchLanguage = (lang: LanguageType) => {
    let newUrl = "";

    const [slash, langCode, ...restPathname] = pathname.split("/");

    let resPathUrl = "";
    if (restPathname.length > 0) {
      resPathUrl = restPathname.join("/");
    }

    newUrl = restPathname.join("/");

    setCurrentLange({ ...lang });
    router.push(`/${lang.code}`);
  };
  return (
    <div className={`${styles.wrapper} ${clx}`}>
      {(currentLanguage && (
        <LanguageConponent
          languages={LANGUAGES}
          currentLang={currentLanguage}
          onSwitchLanguage={handleSwitchLanguage}
        />
      )) || <LoadingLangComponent />}
    </div>
  );
};

export default memo(LanguageSwitcher);
