import { useState } from "react";
import styled from "styled-components";
import fetchAPI from "../../../../utils/fetchAPI";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";
import Button from "../../../UI/Button";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineFileImage } from "react-icons/ai";
import { useDataContext, useUIContext } from "../../../../store/context";
import LoadingSpinner from "../../../UI/LoadingSpinner";
// import loadImage from "blueimp-load-image";

export default function NewPlaceForm({
  latitude,
  longitude,
  countryName,
  flagUrl,
  hideForm,
  places,
  setPlaces,
}) {
  const [placeName, setPlaceName] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  // const [file, setFile] = useState(null);
  const [creatingPlace, setCreatingPlace] = useState(false);
  const [file, setFile] = useState(null);

  const { setModal } = useUIContext();
  const { reloadData } = useDataContext();

  const backdropClickHandler = (e) => {
    if (!e.target.classList.contains("backdrop")) return;

    hideForm();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!file)
      return setModal({ type: "error", message: "Please, provide an image" });

    setCreatingPlace(true);

    const form = new FormData();

    form.append("name", placeName);
    form.append("latitude", latitude);
    form.append("longitude", longitude);
    // form.append("photo", document.getElementById("photo").files[0]);
    form.append("photo", file);
    form.append("description", placeDescription);

    const { ok, data, message } = await fetchAPI(
      "api/v1/places/",
      "POST",
      form
    );

    setCreatingPlace(false);

    if (!ok) return setModal({ type: "error", message });

    if (places.length === 0) {
      setModal({ type: "info", message: "Click on flag" });
    } else {
      setModal({ type: "success", message: "Place created" });
    }

    setPlaces((prev) => [...prev, data.place]);
    hideForm();
    reloadData();
  };

  const uploadPhoto = (e) => {
    const input = document.createElement("input");
    input.type = "file";
    input.id = "photo";
    input.accept = "image/*";
    input.required = true;

    input.onchange = () => {
      const uploadedFile = Array.from(input.files)[0];

      if (!uploadedFile.type.startsWith("image")) {
        setFile(null);
        return setModal({
          type: "error",
          message: "Only images are allowed to upload",
        });
      }

      if (file)
        setModal({
          type: "success",
          message: "New image uploaded",
        });

      setFile(uploadedFile);
      // e.target.classList.add("uploadBtn--uploaded");
    };

    input.click();
  };

  return (
    <Div className="backdrop" onClick={backdropClickHandler}>
      <form className="form form__newPlace hidden" onSubmit={submitHandler}>
        <p className="country__title">{countryName}</p>
        <div className="country">
          <div className="country__flag">
            <img
              crossorigin="anonymous"
              src={flagUrl}
              srcSet={`${flagUrl} 2x`}
              width="80"
              height="53"
              alt={`Flag of ${countryName}`}
              draggable="false"
            />
          </div>
          <div className="coordinates">
            <div className="coordinate">
              <div className="coordinate__icon">
                <TbWorldLatitude />
              </div>
              <div className="coordinate__value"> {latitude.toFixed(6)}</div>
            </div>
            <div className="coordinate">
              <div className="coordinate__icon">
                <TbWorldLongitude />
              </div>
              <div className="coordinate__value"> {longitude.toFixed(6)}</div>
            </div>
          </div>
        </div>
        <div className="textInputs">
          <input
            id="placeName"
            type="text"
            maxLength="25"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="Name of place"
            className="textInput"
            required
          />
          <input
            id="photoDescription"
            type="text"
            maxLength="70"
            value={placeDescription}
            onChange={(e) => setPlaceDescription(e.target.value)}
            className="textInput"
            placeholder="Place Description"
          />
        </div>
        <button
          type="button"
          className={`uploadBtn ${file && "uploadBtn--uploaded"}`}
          onClick={(e) => uploadPhoto(e)}
        >
          {!file && (
            <AiOutlineFileImage className="uploadBtn__icon uploadBtn__icon--file" />
          )}
          <BsCheckLg
            className={`uploadBtn__icon uploadBtn__icon--check ${
              file && "uploadBtn__icon--visible"
            }`}
          />
        </button>
        <div className="buttonContainer">
          {creatingPlace ? (
            <LoadingSpinner />
          ) : (
            <Button type="primary">Create Place</Button>
          )}
        </div>
      </form>
    </Div>
  );
}

const Div = styled.div`
  background-color: rgba(0, 0, 0, 0.8);

  // 1. variant
  width: 100%;
  height: calc(100% + var(--header-height));

  position: absolute;
  top: calc(-1 * var(--header-height));
  left: 0;

  // 2. variant
  /* width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0; */

  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--border-radius);

  /* border-bottom-left-radius: var(--border-radius); */
  /* border-bottom-right-radius: var(--border-radius); */

  form {
    background-color: var(--color-lightgray);
    border: 6px solid var(--color-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    padding: 2rem 3rem;

    .textInputs {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .textInput {
      padding: 0.8rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;
      font-size: 1.3rem;
      color: var(--color-gray);
      color: var(--color-primary);

      :not(:last-of-type) {
        margin-bottom: 1.2rem;
      }

      ::placeholder {
        font-size: 1.2rem;
        color: var(--color-lightgray);
      }
      /* color: red; */
    }

    .country {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 3rem;

      &__title {
        color: var(--color-primary);
        font-size: 2rem;
        font-weight: bold;
      }
    }

    .coordinate {
      display: flex;
      align-items: center;
      gap: 0.7rem;

      :not(:last-of-type) {
        margin-bottom: 0.7rem;
      }

      &__icon {
        font-size: 1.6rem;
        transform: translateY(2px);
      }

      &__value {
        font-size: 1.6rem;
      }
    }
  }

  .buttonContainer {
    position: relative;
    height: 5.05rem;
  }

  .uploadBtn {
    width: 5rem;
    height: 5rem;

    border-radius: 10rem;
    outline: none;
    border: 5px solid var(--color-primary);

    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: 3rem 0; */
    margin-bottom: 1rem;

    position: relative;

    cursor: pointer;

    transition: all 0.3s;

    &--uploaded {
      /* background-color: red; */
      background-color: var(--color-primary);
    }

    .uploadBtn__icon {
      font-size: 2.2rem;

      &--file {
        color: var(--color-primary);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
      &--check {
        color: white;
        transform: scale(0);
        transition: all 0.3s 0.1s;
      }

      &--visible {
        transform: scale(1);
      }
    }
  }
`;
