import { useState } from "react";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineFileImage } from "react-icons/ai";
import { useForm } from "react-hook-form";

import { useUIContext } from "../../store/context";
import { Button, LoadingPageSpinner } from "../../components/UI";
import { Container } from "./NewPlaceForm.styled";
import { useAddPlace } from "../../api/hooks/useAddPlace";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";
import { MAX_PHOTO_SIZE } from "../../utils/constants";

export default function NewPlaceForm({
  latitude,
  longitude,
  countryName,
  flagUrl,
  hideForm,
  userPlaces,
}) {
  const [file, setFile] = useState(null);
  const { setModal } = useUIContext();
  const { currentUser } = useCurrentUser();
  const { isCreating, addPlace } = useAddPlace();

  console.log({ file });
  console.dir(file);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const backdropClickHandler = (e) => {
    if (!e.target.classList.contains("backdrop")) return;

    if (isCreating) return;

    hideForm();
  };

  const submitHandler = async (formData, e) => {
    e.preventDefault();

    const { placeName, placeDescription } = formData;

    if (!file)
      return setModal({ type: "error", message: "Please, provide an image" });

    const form = new FormData();

    form.append("name", placeName);
    form.append("latitude", latitude);
    form.append("longitude", longitude);
    form.append("photo", file);
    form.append("description", placeDescription);

    try {
      await addPlace(form);
    } catch (e) {
      return;
    }

    hideForm();

    if (
      userPlaces?.length === 0 &&
      window.location.pathname === `/${currentUser.username}`
    )
      return setModal({ type: "info", message: "Click on flag to zoom" });

    setModal({ type: "success", message: "Place created" });
  };

  const errorsHandler = () => {
    let message = null;

    if (errors.placeDescription?.message)
      message = errors.placeDescription.message;
    if (errors.placeName?.message) message = errors.placeName.message;

    if (message)
      return setModal({
        type: "error",
        message,
      });

    setModal({
      type: "error",
      message: "Creating place error",
    });
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

      if (uploadedFile.size > MAX_PHOTO_SIZE) {
        setFile(null);
        return setModal({
          type: "error",
          message: `Sorry, max file size is ${
            Math.round((10 * MAX_PHOTO_SIZE) / 1000000, 1) / 10
          }MB`,
        });
      }

      if (file)
        setModal({
          type: "success",
          message: "New image uploaded",
        });

      setFile(uploadedFile);
    };

    input.click();
  };

  return (
    <Container className="backdrop" onMouseDown={backdropClickHandler}>
      <form
        className="form form__newPlace hidden"
        onSubmit={handleSubmit(submitHandler, errorsHandler)}
      >
        <p className="country__title">{countryName}</p>
        <div className="country">
          <div className="country__flag">
            <img
              crossorigin="anonymous"
              src={flagUrl}
              srcSet={`${flagUrl} 2x`}
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
            placeholder="Name of place"
            className="textInput"
            {...register("placeName", {
              required: "Name of place is required",
              maxLength: {
                value: 25,
                message: "Name of place cannot have more than 25 characters",
              },
            })}
          />
          <input
            id="photoDescription"
            type="text"
            maxLength="70"
            className="textInput"
            placeholder="Place Description"
            {...register("placeDescription", {
              maxLength: {
                value: 70,
                message:
                  "Description of place cannot have more than 70 characters",
              },
            })}
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
          {isCreating ? (
            <LoadingPageSpinner />
          ) : (
            <Button type="primary">Create Place</Button>
          )}
        </div>
      </form>
    </Container>
  );
}
