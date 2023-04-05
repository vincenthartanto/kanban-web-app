import useWindowSize from "./useWindow";

export default function useImage([smImg, mdImg, lgImg]) {
  const [image, setImage] = useState("");
  const { width } = useWindowSize();
  useEffect(() => {
    setImage(() => {
      if (width < 768) {
        return smImg;
      } else if (width < 1440) {
        return mdImg;
      } else {
        return lgImg;
      }
    });
  }, width);
}
