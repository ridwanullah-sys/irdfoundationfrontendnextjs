"use client";
import Image from "next/image";
import GetCats from "./hooks/getCats";
import GetSubCats from "./hooks/getSubCatsByCatsId";
import GetDuasByCats from "./hooks/getDuasBySubCatId";
import { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { CiRepeat } from "react-icons/ci";

export default function Home() {
  const { getCats } = GetCats();
  const { getSubCats } = GetSubCats();
  const { getDuas } = GetDuasByCats();
  const [cats, setCats] = useState();
  const [subcats, setSubCats] = useState([]);
  const [duas, setDuas] = useState({});
  const [activeCat, setActiveCat] = useState(1);
  const [activeSubCat, setActiveSubCat] = useState(1);
  const [chosenSettings, setChosenSettings] = useState(1);
  const [nightmode, setNightMode] = useState(false);
  const audioRefs = useRef({});
  const [isPlaying, setIsPlaying] = useState("0");
  const [inter, setInter] = useState(null);
  const [TimeRemaining, setTimeRemaining] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const getCategories = async () => {
    const cat = await getCats();
    setCats(cat);
  };

  const getSubCategories = async (id) => {
    const subcat = await getSubCats(id);
    setSubCats(subcat);
  };

  const getTheDuas = async () => {
    const obj = {};
    subcats.forEach(async (subcat, index) => {
      const eachdua = await getDuas(subcat.id);
      obj[subcat.subcat_name_en] = eachdua;
      if (index == subcats.length - 1) setDuas(obj);
    });
  };

  const togglePlay = (ref) => {
    const audioref = audioRefs.current;
    if (isPlaying !== "0") {
      setIsPlaying("0");
      audioref[isPlaying].pause();
    }
    if (isPlaying == "0") {
      if (!audioref[ref].paused) {
        audioref[ref].pause();
        setIsPlaying("0");
      } else {
        audioref[ref].play();
        setIsPlaying(ref);
      }
    }
  };

  useEffect(() => {
    if (isPlaying !== "0") {
      setInter(
        setInterval(() => {
          const audioref = audioRefs.current;
          const currenttime = audioref[isPlaying].currentTime;
          const duration = audioref[isPlaying].duration;
          setTimeRemaining(Math.floor(duration - currenttime));
          setPercentage(Math.floor((currenttime / duration) * 100));
        }, 1000)
      );
    } else {
      clearInterval(inter);
    }
  }, [isPlaying, audioRefs]);

  useEffect(() => {
    const sec = TimeRemaining % 60;
    setSeconds(Math.floor(sec));
    const min = TimeRemaining / 60;
    setMinutes(Math.floor(min));
  }, [TimeRemaining]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getSubCategories(activeCat);
  }, [activeCat]);

  useEffect(() => {
    if (subcats.length > 0) {
      setActiveSubCat(subcats[0].id);
      setDuas({});
      getTheDuas();
    }
  }, [subcats]);

  useEffect(() => {
    console.log(duas);
  }, [duas]);

  return (
    <div className="h-screen bg-[#F7F8FA] flex items-center px-10">
      <div className="w-[100px] h-[95%] bg-[#FFFFFF] rounded-[24px]  flex flex-col justify-between items-center mr-6 pt-[25px] pb-[31px]">
        <button>
          <Image
            src="/one.png"
            alt="one.svg"
            width={100}
            height={100}
            layout="intrinsic"
          />
        </button>
        <div className="flex flex-col gap-5">
          <button className="bg-[#E8F0F5] rounded-full p-[9px] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            <Image src="home 1.svg" alt="home 1.svg" width={20} height={20} />
          </button>
          <button className="bg-[#E8F0F5] rounded-full p-[9px] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            <Image
              src="54-menu-2.svg"
              alt="54-menu-2.svg"
              width={20}
              height={20}
            />
          </button>
          <button className="bg-[#E8F0F5] rounded-full p-[9px] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            <Image
              src="Clip path group.svg"
              alt="Clip path group.svg"
              width={20}
              height={20}
            />
          </button>
          <button className="bg-[#E8F0F5] rounded-full p-[9px] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            <Image
              src="3-keep-minus.svg"
              alt="3-keep-minus.svg"
              width={20}
              height={20}
            />
          </button>
          <button className="bg-[#E8F0F5] rounded-full p-[9px] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            <Image
              src="ruqyah 1.svg"
              alt="ruqyah 1.svg"
              width={20}
              height={20}
            />
          </button>
          <button className="bg-[#E8F0F5] rounded-full p-[9px] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            <Image
              src="dua-info 1.svg"
              alt="dua-info 1.svg"
              width={20}
              height={20}
            />
          </button>
          <button className="bg-[#E8F0F5] rounded-full p-[9px] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            <Image src="books 1.svg" alt="books 1.svg" width={20} height={20} />
          </button>
        </div>
        <button className="bg-[#1FA45B] w-[57px] h-[56px] rounded-[10px] flex justify-center items-center ">
          <Image
            src="bxs_donate-heart.svg"
            width={24}
            height={24}
            alt="bxs_donate-heart.svg"
          />
        </button>
      </div>
      <div className="w-full h-[95%]">
        <div className="flex justify-between items-center h-[10%]">
          <div className="text-2xl font-[600]">Dua Page</div>
          <div className="flex gap-80 items-center">
            <div className="flex bg-white h-10 w-80 justify-between items-center rounded-[10px] focus:border-2 relative">
              <input
                placeholder="Search by Dua Name"
                className="h-full w-full focus:outline outline-1 outline-offset-0 rounded-[10px] pl-2 pr-1 text-sm font-[400] border-[0.5px]"
              />
              <button className="bg-[#F3F4F6] py-2 px-4 rounded-[6px] absolute right-[4px]">
                <Image
                  src="search.svg"
                  width={16}
                  height={16}
                  alt="search.svg"
                />
              </button>
            </div>
            <button className="flex gap-[10px] h-[45px] items-center">
              <Image src="/user.png" width={40} height={40} alt="user" />
              <Image
                src="polygon 2.svg"
                width={12}
                height={9}
                alt="polygon.svg"
              />
            </button>
          </div>
        </div>
        <div className="flex justify-between h-[90%]">
          <div className="w-[26%] bg-white rounded-[10px] border-[0.5px] border-[#E2E2E2]">
            <div className="h-[17%]">
              <div className="bg-[#1FA45B] rounded-t-[10px] h-[50%] text-lg font-[600] text-white text-center flex items-center justify-center">
                categories
              </div>
              <div className="h-[50%] py-2 px-3">
                <div className="flex h-full w-full bg-white justify-between items-center focus:border-2 relative rounded-[7px] border-2 b-[#E2E2E2]">
                  <input
                    placeholder="Search by Categories"
                    className="h-full w-full focus:outline outline-2 outline-[#1FA45B] px-[4px] pl-12 rounded-[7px] text-sm font-[400]"
                  />
                  <button className="px-[10px] rounded-[6px] absolute left-0 inset-y-0">
                    <Image
                      src="search.svg"
                      width={16}
                      height={16}
                      alt="search.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[83%] p-2 overflow-auto flex flex-col gap-4">
              {cats &&
                cats.map((cat) => (
                  <div key={cat.id}>
                    <button
                      className={`flex p-2 ${
                        activeCat === cat.id && "bg-[#E8F0F5]"
                      } rounded-[10px] h-16 items-center hover:bg-[#E8F0F5] w-full`}
                      onClick={() => {
                        setSubCats([]);
                        setActiveCat(cat.id);
                      }}
                    >
                      <div className="bg-[#CFE0E5] rounded-[10px] w-[15%] flex justify-center items-center py-2 h-fit">
                        <Image
                          src="/duaicon.png"
                          width={35}
                          height={35}
                          alt="duaicon.png"
                        />
                      </div>
                      <div className=" w-[70%] flex flex-col justify-center px-2 text-start">
                        <div className="font-[600] text-sm text-[#1FA45B]">
                          {cat.cat_name_en}
                        </div>
                        <div className="font-[400] text-sm text-[#7E7E7E]">
                          Subcategory: {cat.no_of_subcat}
                        </div>
                      </div>
                      <div className="w-[15%] border-l-2 border-[#E2E2E2] flex flex-col justify-center items-center">
                        <div className="font-[600] text-lg text-[#393939]">
                          {cat.no_of_dua}
                        </div>
                        <div className="font-[400] text-sm text-[#7E7E7E]">
                          Duas
                        </div>
                      </div>
                    </button>
                    <div className="flex relative mt-2">
                      <div className="w-[8px] border-[0.5px] border-dotted absolute border-[#1FA45B] inset-y-0 left-[24px] w-0"></div>
                      <div>
                        {activeCat === cat.id && subcats.length > 0
                          ? subcats.map((subcat) => (
                              <div
                                key={subcat.id}
                                className=" py-2 flex flex-col gap-2 px-[10px]"
                              >
                                <button
                                  className="p-0 font-[500] text-sm text-[#373737] flex justify-between items-center text-left"
                                  onClick={() => setActiveSubCat(subcat.id)}
                                >
                                  <div className="bg-[#1FA45B] w-[8px] h-[8px] rounded-full m-[10px]"></div>
                                  <div
                                    className={`w-[90%] ${
                                      activeSubCat === subcat.id &&
                                      "text-[#1FA45B]"
                                    }`}
                                  >
                                    {subcat.subcat_name_en}
                                  </div>
                                </button>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-[51%] flex flex-col gap-2 overflow-auto">
            {subcats.length > 0 &&
              subcats.length === Object.keys(duas).length &&
              subcats.map((subcat) => (
                <div key={`{${subcat.id}key`}>
                  <div className="bg-white py-2 px-4 border-[0.5px] rounded-[10px]">
                    <span className="font-[600] text-sm text-[#1FA45B]">
                      Section:{" "}
                    </span>
                    <span className="font-[500] text-sm">
                      {subcat.subcat_name_en}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    {duas[subcat.subcat_name_en] &&
                      duas[subcat.subcat_name_en].map((dua, index) => (
                        <div
                          key={`${dua.id}${index}`}
                          className="bg-white py-2 px-4 border-[0.5px] rounded-[10px] flex flex-col gap-5"
                        >
                          <div className="flex gap-2 items-center">
                            <div>
                              <Image
                                src="Allah 1.svg"
                                width={25}
                                height={25}
                                alt="Allah 1.svg"
                              />
                            </div>
                            <div className="font-[600] text-sm text-[#1FA45B]">
                              {dua.id}. {dua.dua_name_en}{" "}
                            </div>
                          </div>
                          {dua.top_en && (
                            <div className="font-[400] text-sm">
                              {dua.top_en}
                            </div>
                          )}
                          {dua.dua_arabic && (
                            <div className="font-[500] text-[20px] text-right">
                              {dua.dua_arabic}
                            </div>
                          )}
                          {dua.transliteration_en && (
                            <div className="font-[400] text-sm">
                              <span className="font-[600]">
                                Transliteration:{" "}
                              </span>
                              {dua.transliteration_en}
                            </div>
                          )}
                          {dua.translation_en && (
                            <div className="font-[400] text-sm">
                              <span className="font-[600]">Translation: </span>
                              {dua.translation_en}
                            </div>
                          )}
                          {dua.refference_en && (
                            <div>
                              <div className="font-[600] text-sm text-[#1FA45B]">
                                Refernce:
                              </div>
                              <div className="font-[500] text-sm">
                                {dua.refference_en}
                              </div>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <div>
                              {dua.audio && (
                                <div>
                                  <div>
                                    <audio
                                      ref={(el) =>
                                        (audioRefs.current[
                                          `${dua.id}${index}`
                                        ] = el)
                                      }
                                      src={dua.audio}
                                      preload="auto"
                                      onEnded={() => {
                                        setIsPlaying("0");
                                        setTimeRemaining(0);
                                        setPercentage(0);
                                      }}
                                    >
                                      Your browser does not support the audio
                                      element.
                                    </audio>
                                  </div>
                                  <div className="flex items-center justify-center gap-4">
                                    <button
                                      className="bg-[#1FA45B] text-3xl text-white rounded-full p-1 flex items-center justify-center"
                                      onClick={() =>
                                        togglePlay(`${dua.id}${index}`)
                                      }
                                    >
                                      {isPlaying === `${dua.id}${index}` ? (
                                        <BsPauseFill />
                                      ) : (
                                        <BsFillPlayFill />
                                      )}
                                    </button>
                                    {`${dua.id}${index}` === isPlaying && (
                                      <div className="flex items-center justify-center gap-4">
                                        <input
                                          type="range"
                                          value={percentage}
                                          className="h-1 w-20"
                                        />
                                        <div className="font-[400] text-xs text-slate-600">{`${
                                          minutes > 9 ? minutes : `0${minutes}`
                                        } : ${
                                          seconds > 9 ? seconds : `0${seconds}`
                                        }`}</div>
                                        <button
                                          className=" text-lg text-slate-600"
                                          onClick={() => {
                                            audioRefs.current[
                                              `${dua.id}${index}`
                                            ].currentTime = 0;
                                            togglePlay(`${dua.id}${index}`);
                                          }}
                                        >
                                          <CiRepeat />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-10">
                              <button>
                                <Image
                                  src="copy.svg"
                                  width={16}
                                  height={16}
                                  alt="copy.svg"
                                  title="copy"
                                />
                              </button>
                              <button>
                                <Image
                                  src="3-keep-minus.svg"
                                  alt="3-keep-minus.svg"
                                  width={20}
                                  height={20}
                                  title="bookmark"
                                />
                              </button>
                              <button>
                                <Image
                                  src="memorise.svg"
                                  width={16}
                                  height={16}
                                  alt="memorise.svg"
                                  title="memorize"
                                />
                              </button>
                              <button>
                                <Image
                                  src="share.svg"
                                  width={16}
                                  height={16}
                                  alt="share.svg"
                                  title="share"
                                />
                              </button>
                              <button>
                                <Image
                                  src="report.svg"
                                  width={16}
                                  height={16}
                                  alt="report.svg"
                                  title="report"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="rounded-[32px] bg-white w-[20%] py-6 px-4">
            <div className="font-[700] text-lg text-[#393939] text-center">
              Settings
            </div>
            <div className=" flex flex-col items-center pt-6 gap-4">
              <button
                className="bg-[#F7F8FA] flex items-center w-full rounded-[5px]"
                onClick={() => {
                  setChosenSettings(1);
                }}
              >
                <div
                  className={`${
                    chosenSettings === 1 ? "bg-[#1FA45B]" : "bg-[#F7F8FA]"
                  } w-[2%] flex-1 m-0 h-10 rounded-l-[5px]`}
                ></div>
                <div className="w-[23%] flex justify-center items-center">
                  <div className="w-fit bg-[#E8F0F5] rounded-full p-2">
                    <Image src="ls.svg" width={15} height={15} alt="ls.svg" />
                  </div>
                </div>
                <div
                  className={`${
                    chosenSettings === 1 && "text-[#1FA45B]"
                  } text-left text-sm w-[75%]`}
                >
                  Language Settings
                </div>
              </button>
              <button
                className="bg-[#F7F8FA] flex items-center w-full rounded-[5px]"
                onClick={() => {
                  setChosenSettings(2);
                }}
              >
                <div
                  className={`${
                    chosenSettings === 2 ? "bg-[#1FA45B]" : "bg-[#F7F8FA]"
                  } w-[2%] flex-1 m-0 h-10 rounded-l-[5px]`}
                ></div>
                <div className="w-[23%] flex justify-center items-center">
                  <div className="w-fit bg-[#E8F0F5] rounded-full p-2">
                    <Image src="gs.svg" width={15} height={15} alt="gs.svg" />
                  </div>
                </div>
                <div
                  className={`${
                    chosenSettings === 2 && "text-[#1FA45B]"
                  } text-left text-sm w-[75%]`}
                >
                  General Settings
                </div>
              </button>
              <button
                className="bg-[#F7F8FA] flex items-center w-full rounded-[5px]"
                onClick={() => {
                  setChosenSettings(3);
                }}
              >
                <div
                  className={`${
                    chosenSettings === 3 ? "bg-[#1FA45B]" : "bg-[#F7F8FA]"
                  } w-[2%] flex-1 m-0 h-10 rounded-l-[5px]`}
                ></div>
                <div className="w-[23%] flex justify-center items-center">
                  <div className="w-fit bg-[#E8F0F5] rounded-full p-2">
                    <Image
                      src="54-menu-2.svg"
                      width={15}
                      height={15}
                      alt="54-menu-2.svg"
                    />
                  </div>
                </div>
                <div
                  className={`${
                    chosenSettings === 3 && "text-[#1FA45B]"
                  } text-left text-sm w-[75%]`}
                >
                  Font Settings
                </div>
              </button>
              <button
                className="bg-[#F7F8FA] flex items-center w-full rounded-[5px]"
                onClick={() => {
                  setChosenSettings(4);
                }}
              >
                <div
                  className={`${
                    chosenSettings === 4 ? "bg-[#1FA45B]" : "bg-[#F7F8FA]"
                  } w-[2%] flex-1 m-0 h-10 rounded-l-[5px]`}
                ></div>
                <div className="w-[23%] flex justify-center items-center">
                  <div className="w-fit bg-[#E8F0F5] rounded-full p-2">
                    <Image
                      src="54-menu-2.svg"
                      width={15}
                      height={15}
                      alt="54-menu-2.svg"
                    />
                  </div>
                </div>
                <div
                  className={`${
                    chosenSettings === 4 && "text-[#1FA45B]"
                  } text-left text-sm w-[75%]`}
                >
                  Appearance Settings
                </div>
              </button>
              <div className="w-full flex justify-between">
                <div className="text-sm">Night Mode</div>
                <button
                  className="w-8 h-4 flex items-center relative"
                  onClick={() => {
                    if (nightmode) {
                      setNightMode(false);
                    } else {
                      setNightMode(true);
                    }
                  }}
                >
                  <div className="h-3 w-full bg-[#C1C1C1B2] rounded-full"></div>
                  <div
                    className={`h-4 w-4 bg-[#A4A4A4] absolute rounded-full ${
                      nightmode ? "left-0" : "right-0"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
