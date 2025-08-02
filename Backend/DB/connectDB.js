

 export async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/civictrack', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}