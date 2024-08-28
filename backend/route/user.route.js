import express from "express"
import {
    retrieve_all_users,
    add_bulk_user,
    retrieve_domain_gender,
    one_user,
    create_user,
    update_user,
    delete_user,
    get_team,
    add_team,
    get_one_team
} from "../controller/user.controller.js";
const route = express.Router();


route.get("/users", retrieve_all_users);
route.get("/users/:id", one_user);
route.post("/users", create_user);
route.put("/users/:id", update_user); //
route.delete("/users/:id", delete_user);
route.get("/team", get_team);
route.post("/team", add_team);
route.get("/team/:id", get_one_team);

route.post("/bulk", add_bulk_user);
route.get("/domain_gender", retrieve_domain_gender)


export default route
