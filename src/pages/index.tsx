import { wait } from "@/utils/promise";
import { useEffect, useState, useMemo } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Array<TeamData>>([]);

  const club_ids = useMemo(() => {
    return [
      13520, 23830, 23461, 23873, 23112, 24024, 50754, 23384, 50749, 23938,
      24104, 23720, 23527, 23770, 23602, 21924, 23333, 22376, 21797, 22206,
      21697, 21971, 22144, 22518, 21751, 22258, 22337, 21868, 24170, 22067,
      22442, 24226, 23646,
    ].map((id) => id.toString());
  }, []);

  useEffect(() => {
    console.log("Useeffect called");
    const fetch_data = async () => {
      const team_data = [];

      for (const id of club_ids) {
        const response = await fetch(`/api/club/${id}`);
        const data = (await response.json()) as {
          error: boolean;
          message: string;
          data: TeamData;
        };
        team_data.push(data.data);
        setTeams(team_data);
        await wait(500);
      }

      setLoading(false);
    };

    setTimeout(() => {
      void fetch_data();
    }, 1000);
  }, [club_ids]);
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        teams.map((team, index) => {
          if (team) {
            return (
              <div key={team.teamId}>
                <h3></h3>
              </div>
            );
          } else {
            return <div key={index}>Error</div>;
          }
        })
      )}
    </div>
  );
}

export type TeamData = {
  name: string;
  clubId: number;
  regionId: number;
  teamId: number;
  customKit: {
    isCustomTeam: string;
    crestAssetId: string;
    useBaseAsset: string;
  };
};

// export const getServerSideProps: GetServerSideProps<{
//   teams: Array<TeamData>;
// }> = async () => {
//   const team_data: Array<TeamData> = [];

//   for (const club_id of club_ids) {
//     const response = await fetch(
//       `https://proclubs.ea.com/api/nhl/clubs/info?platform=ps5&clubIds=${club_id}`,
//     );
//     const data = (await response.json()) as Record<string, TeamData>;
//     const team = data[club_id]!;
//     team_data.push(team);
//   }

//   return {
//     props: {
//       teams: team_data,
//     },
//   };
// };
