import useSWR from "swr";
import StreakQuestions from "./StreakQuestions";
import IPlayer from "@/interfaces/players";

export default function Streak(props: {
  player: IPlayer;
  setPlayer: any;
  setWhatToShow: any;
  streakNumber: number;
  setStreakNumber: any;
}) {
  const fetcher = (url: any) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/staticdata", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <StreakQuestions
        player={props.player}
        setPlayer={props.setPlayer}
        verbsData={data}
        setWhatToShow={props.setWhatToShow}
        streakNumber={props.streakNumber}
        setStreakNumber={props.setStreakNumber}
      />
    </div>
  );
}
