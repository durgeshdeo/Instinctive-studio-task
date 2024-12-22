import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/students`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (studentData, { rejectWithValue }) => {
    // console.log(studentData);
    try {
      const response = await axios.post(
        `${BASE_URL}/students/create`,
        studentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/students/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, name }, { rejectWithValue }) => {
    try {
      await axios.put(`${BASE_URL}/students/update/${id}`, { name });
      return { id, name };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    filteredStudents: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterStudents: (state, action) => {
      const { cohort, course } = action.payload;
      state.filteredStudents = state.students.filter((student) => {
        const cohortMatch = cohort ? student.cohort === cohort : true;
        const courseMatch = course
          ? student.courses.some((c) => c.name === course)
          : true;
        return cohortMatch && courseMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.filteredStudents = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
        state.filteredStudents = state.filteredStudents.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        state.students = state.students.map((student) =>
          student.id === id ? { ...student, name } : student
        );
        state.filteredStudents = state.filteredStudents.map((student) =>
          student.id === id ? { ...student, name } : student
        );
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.unshift(action.payload); // Add to top
        state.filteredStudents = [...state.students].sort(
          (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
        );
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { filterStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
