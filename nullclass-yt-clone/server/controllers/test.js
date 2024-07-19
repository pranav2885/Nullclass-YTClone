// const mongoose = require('mongoose');
// const User = require('./models/auth');

// const updateUserPoints = async (email, points) => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/your-database-name', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const user = await User.findById(email);
//     if (user) {
//       const newPoints = user.points + points;
//       await User.findByIdAndUpdate(email, { $set: { points: newPoints } });
//       console.log(`Updated points for user ${email}: ${newPoints}`);
//     }
// // 
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error updating points: ", error);
//   }
// };

// updateUserPoints('user-id-here', 5);  
