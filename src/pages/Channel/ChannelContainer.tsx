import axios from "axios"
import { ChannelHeader } from "../../components"
import './ChannelContainer.scss'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Channel } from "../../interfaces";

const DOMAIN_BD = import.meta.env.VITE_DOMAIN_BD;

const ChannelContainer = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState<Channel>();

  const getChannel = async () => {
    const response = await axios.get(`${DOMAIN_BD}/channel/${id}`);
    setChannel(response.data);
  }

  useEffect(() => {
    getChannel();
  }, [id]);

  return (
    <div className="channelContainer">
      {
        channel && (
          <ChannelHeader name={channel.name} logo={channel.logo as string} />
        )
      }
    </div>
  )
}

export default ChannelContainer
