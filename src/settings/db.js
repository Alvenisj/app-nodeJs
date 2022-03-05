import mongoose from 'mongoose';
import {database} from './keys';



mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then((data) => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))