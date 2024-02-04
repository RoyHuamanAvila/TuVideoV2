import { FC, useEffect, useState } from "react";
import ChannelHeaderView from "./ChannelHeaderView"
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export type ChannelHeaderContainerProps = {
  name: string;
  logo: string;
  id: string;
}

const ChannelHeaderContainer: FC<ChannelHeaderContainerProps> = ({ logo, name, id }) => {
  const [isMyChannel, setIsMyChannel] = useState(false);
  const channelId = useSelector((state: RootState) => state.user?.user_metadata?.channel);

  const verifyIsMyChannel = async () => {
    if (channelId && channelId === id) {
      setIsMyChannel(true);
    }
  }

  useEffect(() => {
    verifyIsMyChannel();
  })

  return <ChannelHeaderView logo={logo} name={name} isMyChannel={isMyChannel} />
}
export default ChannelHeaderContainer
