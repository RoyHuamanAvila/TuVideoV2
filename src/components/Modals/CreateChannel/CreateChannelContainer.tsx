import { useAuth0 } from "@auth0/auth0-react"
import CreateChannelView from "./CreateChannelView"
import { useRef, useState } from "react";
import axios from "axios";

const CreateChannelContainer = () => {
  const { user } = useAuth0();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [pathImage, setPathImage] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const { getAccessTokenSilently } = useAuth0();

  const handleInputFile = () => {
    console.log(inputFileRef.current?.files)
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPathImage(reader.result as string);
        }
      }
    }
  }

  const handleChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (inputFileRef.current?.files) {
        const file = inputFileRef.current?.files[0];
        const formData = new FormData();
        console.log("FormData before sending:", formData);

        formData.append('logo', file);
        formData.append('name', channelName);

        console.log("FormData after appending data:", formData);

        const VITE_DOMAIN_BD = import.meta.env.VITE_DOMAIN_BD;
        const accessToken = await getAccessTokenSilently();

        const response = await axios.request({
          method: 'POST',
          url: `${VITE_DOMAIN_BD}/channel`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    user ?
      <CreateChannelView
        user={user}
        inputFileRef={inputFileRef}
        handleInputFile={handleInputFile}
        pathImage={pathImage}
        channelName={channelName}
        handleChannelName={handleChannelName}
        handleSubmit={handleSubmit}
      /> : null
  )
}

export default CreateChannelContainer
