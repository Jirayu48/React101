import { useState } from "react";

type Subject = {
  name: string;
  grade: string;
};

function GradeApp() {
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<string>("A");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (subject.trim() === "") return;
    setSubjects([...subjects, { name: subject, grade }]);
    setSubject("");
    setGrade("A");
  };

  const deleteSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const calculateGPA = () => {
    if (subjects.length === 0) {
      setGpa(null);
      return;
    }

    const gradeToPoint: Record<string, number> = {
      "A": 4.0,
      "B+": 3.5,
      "B": 3.0,
      "C+": 2.5,
      "C": 2.0,
      "D+": 1.5,
      "D": 1.0,
      "F": 0.0,
      "W": 0.0,
    };

    const validSubjects = subjects.filter((s) => s.grade !== "W");
    if (validSubjects.length === 0) {
      setGpa(null);
      return;
    }

    const total = validSubjects.reduce((sum, s) => sum + gradeToPoint[s.grade], 0);
    const gpaValue = total / validSubjects.length;
    setGpa(parseFloat(gpaValue.toFixed(2)));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>GPA Calculator</h1>

      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="ชื่อวิชา"
        style={{ marginRight: "10px" }}
      />

      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="F">F</option>
        <option value="W">W</option>
      </select>

      <button onClick={addSubject} style={{ marginLeft: "10px" }}>
        ➕ เพิ่มรายวิชา
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {subjects.map((s, index) => (
          <li key={index} style={{ margin: "8px 0" }}>
            <span
              style={{
                color: s.grade === "F" ? "red" : "black",
                fontWeight: s.grade === "F" ? "bold" : "normal",
              }}
            >
              {s.name} ({s.grade})
            </span>
            <button
              onClick={() => deleteSubject(index)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>

      <button onClick={calculateGPA} style={{ marginTop: "20px" }}>
        📊 คำนวณ GPA
      </button>

      {gpa !== null && (
        <h2 style={{ marginTop: "15px" }}>GPA: {gpa}</h2>
      )}
    </div>
  );
}

export default GradeApp;
