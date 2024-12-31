import { Users } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET users
export const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// CREATE user

// export const createUser = async (req, res) => {
//   const { name, admin, email, password } = req.body;
//   try {
//     if (!name || !admin || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please fill all fields properly" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(password, salt);

//     const user = await Users.create({
//       name,
//       admin,
//       email,
//       password: hashedPass,
//     });
//     return res.status(200).json({ message: "created sucessfully" });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: error.message });
//   }
// };

export const createUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    return res.status(200).json({ message: "created sucessfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET a user
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE user
export const updateUser = async (req, res) => {
  const { name, admin, email } = req.body;
  const { id } = req.params;
  try {
    if (!name || !admin || !email) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const user = await Users.findByIdAndUpdate(id, { name, admin, email });
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with id ${id} does not exist` });
    }
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const signUpUser = async (req, res) => {
  console.log("signUpUser");

  const { name, email, password } = req.body;
  const admin = false;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    // hash password
    const salt = bcrypt.genSalt(10);
    const hashedpass = bcrypt.hash(password, salt);
    // create user
    const user = await Users.create({ name, admin, email, hashedpass });

    const { id } = user._id;
    // sign in user
    const myToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    return res.status(200).json({ token: myToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const signInUser = async (req, res) => {
  console.log("signInUser");
  // get user credentials
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Incomplete credentials!" });
    }

    // try 1
    // const users = await Users.find({});
    // const found = users.filter((u) => u.email == email);

    // try 2
    const found = await Users.findOne({ email });

    if (!found) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // password hashing verify
    const isPass = await bcrypt.compare(password, found.password);

    if (!isPass) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // jsonwebtoken sign in function
    const { id } = found._id;

    const myToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ _id: found._id, email: found.email, token: myToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
