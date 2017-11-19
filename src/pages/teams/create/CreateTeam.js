
import restApi from "@/restapi";
import GameSelect from "@/components/games/select";
import UserSelect from "@/components/users/select";

export default {
    name: "create-team",

    components:{
        GameSelect,
        UserSelect
    },

    data() {
        return {
            name: null,
            game: {},
            users: []
        };
    },

    methods: {

        create() {
            restApi.post("/api/teams/create", {
                name: this.name,
                gameID: this.game.id,
                membersID: this.users.map(e => e.id)
            }).then(() => {
                this.clearInput();
                this.$router.push({ name: "teams" });
            },
            () => {
                //TODO: доделать обработку ошибок
            });
        },

        changeGame(game){
            this.game = game;
            this.users.splice(0, this.users.length);

            this.$nextTick(() => {
                //nextTick для того, чтобы удалились старые input'ы, которые возможно были заполнены, а не переиспользовались
                for(let i = 0; i < this.game.memberCountInTeam - 1; ++i){
                    this.users.push({id : null, name: null});
                }

            });
        },

        chageUser(selectedUser, userIndex){
            Object.assign(this.users[userIndex], selectedUser);
        },

        clearInput() {
            //TODO: чистить ввод
            // this.$refs["name"].clearInput();
            // this.$refs["gameSelect"].clearInput();
        }
    }
};
