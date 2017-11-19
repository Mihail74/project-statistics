import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js";

export default {
    methods: {
        isForming(team) {
            if(team === undefined){
                return false;
            }
            return team.formingStatus == TeamFormingStatus.FORMING;
        },

        isFormed(team) {
            if(team === undefined){
                return false;
            }
            return team.formingStatus == TeamFormingStatus.FORMED;
        },

        getTeamStat(team){
            if(team === undefined){
                return 0;
            }
            return team.numberOfMatches === 0 ? 0 : Math.floor(team.numberOfWinMatches / team.numberOfMatches * 100);
        },

        getStatusIcon(team){
            switch(team.formingStatus) {
            case TeamFormingStatus.FORMING:
                return "build";
            case TeamFormingStatus.FORMED:
                return "done";
            default:
                return "";
            }
        }
    }
};
