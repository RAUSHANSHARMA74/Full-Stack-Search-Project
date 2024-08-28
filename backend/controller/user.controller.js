import User from "../model/user.model.js";
import { v4 as uuidv4 } from 'uuid';

//ADD BULK USER 
export const add_bulk_user = async (req, res) => {
    try {
        const users = req.body;

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: 'Invalid input: Expected an array of user objects' });
        }

        const result = await User.insertMany(users);

        res.status(201).json({
            message: 'Users added successfully',
            count: result.length,
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to add users' });
    }
};

//RETRIEVE ALL USERS BY SEARCH WITH LIMIT AND PAGE
export const retrieve_all_users = async (req, res) => {
    try {
        const { page = 1, limit = 20, text = '', domain, gender, available } = req.query;

        const pageNumber = parseInt(page, 10);
        const pageLimit = parseInt(limit, 10);

        if (pageNumber < 1 || pageLimit < 1) {
            return res.status(400).json({ message: 'Invalid pagination parameters' });
        }

        const skip = (pageNumber - 1) * pageLimit;

        const filter = {};

        if (text) {
            filter.$or = [
                { first_name: { $regex: text, $options: 'i' } },
                { last_name: { $regex: text, $options: 'i' } }
            ];
        }

        if (domain) {
            filter.domain = domain;
        }

        if (gender) {
            filter.gender = gender;
        }

        if (available) {
            filter.available = available
        }

        const [users, total_users] = await Promise.all([
            User.find(filter)
                .skip(skip)
                .limit(pageLimit)
                .exec(),
            User.countDocuments(filter).exec()
        ]);

        const total_pages = Math.ceil(total_users / pageLimit);

        res.status(200).json({
            status: 200,
            message: "Successfully retrieved filtered data",
            total_users,
            total_pages,
            current_page: pageNumber,
            page_size: pageLimit,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Server error: Failed to retrieve users' });
    }
};


// RETRIEVE DOMAIN AND GENDER
export const retrieve_domain_gender = async (req, res) => {
    try {
        const domainListPromise = User.distinct("domain").exec();

        const genderListPromise = User.distinct("gender").exec();

        const [domainList, genderList] = await Promise.all([domainListPromise, genderListPromise]);

        res.status(200).json({
            domains: domainList,
            genders: genderList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to retrieve domain and gender lists' });
    }
};

export const one_user = async (req, res) => {
    try {
        const id = req.params.id;
        const one_user = await User.findById(id);
        if (!one_user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: "User retrieved successfully",
            data: one_user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to retrieve user' });
    }
};

export const create_user = async (req, res) => {
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const newUser = await User.create({
            id: uuidv4(),
            first_name,
            last_name,
            email: normalizedEmail,
            gender,
            avatar,
            domain,
            available,
            verify: true
        });

        res.status(200).json({ message: "User successfully created", data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the user" });
    }
};

export const update_user = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to update user' });
    }
};

export const delete_user = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to delete user' });
    }
};
export const get_team = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const user = await User.findById(currentUserId).select("team").populate("team");

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Team data retrieved successfully',
            data: user.team
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to retrieve team data' });
    }
};



export const add_team = async (req, res) => {
    try {
        const teamId = req.body.id;
        const currentUserId = req.userId;
        const user = await User.findById(currentUserId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.team.includes(teamId)) {
            user.team.push(teamId);
        } else {
            return res.status(400).json({ message: 'Team already added to user' });
        }

        await user.save();

        res.status(200).json({
            message: 'Team added successfully to user',
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to add team to user' });
    }
};


export const get_one_team = async (req, res) => {
    try {
        const id = req.params.id;
        const one_user = await User.findById(id);
        if (!one_user) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({
            message: "Team retrieved successfully",
            data: one_user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: Failed to retrieve domain and gender lists' });
    }
};


