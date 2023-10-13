import express from 'express';
const fs = require('fs').promises;
const app = express();

interface Book {
    name: string;
    author: string;
    isbn: number;
}

interface BooksData {
    books: Book[];
}

app.get('/books/:name', async(req: any, res: any) => {
    
    const bookName: string = await (req.params.name as string).trim().toLowerCase();
    
    
    try{
        const data: string = await fs.readFile('./public/booksLib.json', 'utf-8');
        var booksData: BooksData= JSON.parse(data);
        if(!booksData.books){
            // Handle errors related to reading/parsing books file
        console.error('Error reading or parsing books file:');
        return res.status(500).send('Internal Server Error');
        }
    }catch(error){
        // Handle errors related to reading/parsing books file
        console.error('Error reading or parsing books file:', error);
        return res.status(500).send('Internal Server Error');
    }
        const filteredBooks: Book[] = booksData.books.filter(book => book.name.trim().toLowerCase().startsWith(bookName));

    // If no matching books found, send an error message
        if (filteredBooks.length === 0) {
            return res.status(404).json({ error: 'No books found with the provided name.' });
        }
    // Perform logic based on bookName or booksData if necessary
    // Send response based on the logic
    res.json({ books: filteredBooks });

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
