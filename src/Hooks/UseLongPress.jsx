import React, { useRef } from "react";
import KanbanTaskSlice, {
  KanbanTaskSliceAction,
} from "../Store/KanbanTaskSlice";
export default function useLongPress(openModal, deleteModal) {
  const timerRef = useRef();
  const isLongPress = useRef(false);

  function handleOnClick() {
    if (isLongPress.current) {
      deleteModal.changeToggle();
      isLongPress.current = false;
    } else {
      openModal.changeToggle();
    }
  }
  function handleOnMouseDown() {
    // for web
    startPressTimer();
  }
  function handleOnMouseUp() {
    clearTimeout(timerRef.current);
  }
  function handleOnTouchStart() {
    // for mobile
    startPressTimer();
  }
  function handleOnTouchEnd() {
    clearTimeout(timerRef.current);
  }
  function startPressTimer() {
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
    }, 300);
  }
  // use long press logic step pada web:
  //1. Ketika user memencet tombol klik sebentar
  //2. Event yang jalan duluan adalah handleOnMouseDown(web) dan HandleOnTouchStart(mobile)
  //3 .pada event tersebut startpress timer akan dipanggil
  //4. Karena dipencetnya cmn sebentar (kalau lama bakal didiemin di function startPressTimer sampe 300 detik ato lebih sampe user lepas), timerRef.current =setTimeout ini belum sempet buat kasin isLongPress.current = true dan alhasil yang kepanggillah langsung handleOnClick
  //5. Pada liat conditionnya nya makan yang dibuka adalah openModal.ChangetToggle()

  return {
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  };
}
