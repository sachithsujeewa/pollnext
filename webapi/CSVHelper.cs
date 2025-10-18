using webapi.Models;

namespace webapi
{
    public class CSVHelper
    {
        private static readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Store", "questions.csv");
        private static readonly object _fileLock = new object();


        public static void AddQuestion(Question question)
        {
            lock (_fileLock)
            {

                bool fileExists = File.Exists(_filePath);
                using (var writer = new StreamWriter(_filePath, append: true))
                {
                    // Write header if file doesn't exist
                    if (!fileExists)
                    {
                        writer.WriteLine("Id,QuestionText,NoOfLikes");
                    }

                    // Escape commas and quotes in QuestionText
                    string escapedText = question.QuestionText.Replace("\"", "\"\"");
                    if (escapedText.Contains(","))
                    {
                        escapedText = $"\"{escapedText}\"";
                    }

                    writer.WriteLine($"{question.Id.ToString()},{escapedText},{question.NoOfLikes}");
                }
            }
        }
        public static IList<Question> GetQuestions()
        {
            lock (_fileLock)
            {

                var questions = new List<Question>();

                if (!File.Exists(_filePath))
                    return questions;

                var lines = File.ReadAllLines(_filePath).Skip(1); // Skip header
                foreach (var line in lines)
                {
                    var parts = ParseCsvLine(line);
                    if (parts.Length == 3 &&
                        int.TryParse(parts[2], out int likes))
                    {
                        questions.Add(new Question
                        {
                            Id = parts[0],
                            QuestionText = parts[1],
                            NoOfLikes = likes
                        });
                    }

                }

                return questions;
            }
        }

        public static Question UpdateQuestion(Question updatedQuestion)
        {
            lock (_fileLock)
            {

                var questions = GetQuestions();
                var index = questions.ToList().FindIndex(q => q.Id == updatedQuestion.Id);

                if (index == -1)
                    throw new Exception("Question not found.");

                questions[index] = updatedQuestion;

                using (var writer = new StreamWriter(_filePath, append: false))
                {
                    writer.WriteLine("Id,QuestionText,NoOfLikes");
                    foreach (var q in questions)
                    {
                        string escapedText = q.QuestionText.Replace("\"", "\"\"");
                        if (escapedText.Contains(","))
                        {
                            escapedText = $"\"{escapedText}\"";
                        }

                        writer.WriteLine($"{q.Id},{escapedText},{q.NoOfLikes}");
                    }
                }

                return updatedQuestion;
            }
        }

        private static string[] ParseCsvLine(string line)
        {
            var result = new List<string>();
            bool inQuotes = false;
            string current = "";

            foreach (char c in line)
            {
                if (c == '"' && inQuotes)
                {
                    inQuotes = false;
                }
                else if (c == '"' && !inQuotes)
                {
                    inQuotes = true;
                }
                else if (c == ',' && !inQuotes)
                {
                    result.Add(current);
                    current = "";
                }
                else
                {
                    current += c;
                }
            }

            result.Add(current);
            return result.ToArray();
        }

    }
}
