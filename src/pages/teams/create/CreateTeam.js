import restApi from "@/restapi";
import GameSelect from "@/components/games/select";
import UserSelect from "@/components/users/select";
import ApiErrors from "@/components/errors/apiErrors";

export default {
    name: "create-team",

    components: {
        GameSelect,
        UserSelect,
        ApiErrors
    },

    data() {
        return {
            name: null,
            game: {},
            users: [],
            cause: '',
            apiErrors: null
        };
    },

    methods: {

        submit() {
            let promises = []
            promises.push(this.$validator.validateAll());
            promises.push(this.$refs["gameSelect"].validate());
            if (this.$refs.users) {
                this.$refs.users.forEach(user => {
                    promises.push(user.validate())
                });
            }

            Promise.all(promises).then((isValid) => {
                if (isValid.every(Boolean)) {
                    this.create();
                    return;
                }
            }).catch((error) => {
                console.log('error')
            })
        },

        create() {
            restApi.post("/api/teams/create", {
                name: this.name,
                gameID: this.game.id,
                membersID: this.users.map(e => e.id)
            }).then(() => {
                this.clearInput();
                this.$router.push({
                    name: "teams"
                });
            }).catch(errors => {
                this.apiErrors = errors
                this.openSnackBar();
            });
        },

        changeGame(game) {
            this.game = game;
            this.users.splice(0, this.users.length);

            this.$nextTick(() => {
                //nextTick для того, чтобы удалились старые input'ы, которые возможно были заполнены, а не переиспользовались
                for (let i = 0; i < this.game.memberCountInTeam - 1; ++i) {
                    this.users.push({
                        id: null,
                        name: null
                    });
                }

            });
        },

        chageUser(selectedUser, userIndex) {
            Object.assign(this.users[userIndex], selectedUser);
        },

        clearInput() {
            this.$refs["name"].clearInput();
            this.$refs["gameSelect"].clearSelect();
            if (this.$refs.users) {
                this.$refs.users.forEach(user => {
                    user.clearSelected();
                });
            }
        },

        openSnackBar() {
            this.$refs.snackbar.open();
        }
    }
};
