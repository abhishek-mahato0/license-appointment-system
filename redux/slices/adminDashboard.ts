import { apiinstance } from "@/services/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type IAdminDashboard = {
  totalCounts: {
    loading: boolean;
    error: string;
    data: Array<{ _id: string; count: number; label: string }>;
  };
  appointments:{
    loading: boolean;
    error: string;
    data: Array<{ _id: string; count: number; label: string }>;
  };
  documents: {
    loading: boolean;
    error: string;
    data: {medical: Array<{ _id: string; count: number; label: string }>,
    written: Array<{ _id: string; count: number; label: string }>,
    trial: Array<{ _id: string; count: number; label: string }>
  };
  }, 
  users: {
    loading: boolean;
    error: string;
    data: Array<{ _id: string; count: number; label: string }>;
  },
  admins: {
    loading: boolean;
    error: string;
    data: Array<{ _id: string; count: number; label: string }>;
  },
  category: {
    loading: boolean;
    error: string;
    data: Array<{ _id: string; count: number; label: string }>;
  },
};


const initialState: IAdminDashboard = {
    totalCounts: {
        loading: false,
        error: "",
        data: [],
    },
    appointments: {
        loading: false,
        error: "",
        data: [],
    },
    documents: {
        loading: false,
        error: "",
        data: {
            medical: [],
            written: [],
            trial: [],
        },
    },
    users: {
        loading: false,
        error: "",
        data: [],
    },
    admins : {
      loading: false,
      error:"",
      data: [],
    }, 
    category: {
      loading: false,
      error:"",
      data: [],
    }
};

export const fetchTotalCounts = createAsyncThunk("fetchCount", async ({ province,from, to}:{province:string, from:string, to:string}) => {
  const res = await apiinstance.get(`admin/dashboard/total?province=${province}&from=${from}&to=${to}`);
  return res.data;
});

export const fetchAppointments = createAsyncThunk("fetchAppointments", async ({ province,from, to}:{province:string, from:string, to:string}) => {
    const res = await apiinstance.get(`admin/dashboard/appointments?province=${province}&from=${from}&to=${to}`);
    return res.data;
  });

export const fetchDocuments = createAsyncThunk("fetchDocuments", async ({ province,from, to}:{province:string, from:string, to:string}) => {
    const res = await apiinstance.get(`admin/dashboard/appointments/documents?province=${province}&from=${from}&to=${to}`);
    return res.data;
  });

export const fetchUsers = createAsyncThunk("fetchUsers", async ({ province,from, to}:{province:string, from:string, to:string}) => {
    const res = await apiinstance.get(`admin/dashboard/users?province=${province}&from=${from}&to=${to}`);
    return res.data;
});

export const fetchAdmins = createAsyncThunk("fetchAdmins", async ({ province,from, to}:{province:string, from:string, to:string}) => {
    const res = await apiinstance.get(`admin/dashboard/admins?province=${province}&from=${from}&to=${to}`);
    return res.data;
});

export const fetchCategory = createAsyncThunk("fetchCategory", async ({ province,from, to}:{province:string, from:string, to:string}) => {
    const res = await apiinstance.get(`admin/dashboard/appointments/category?province=${province}&from=${from}&to=${to}`);
    return res.data;
});

export const admindasSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotalCounts.pending, (state, action) => {
      state.totalCounts.loading = true;
    });
    builder.addCase(fetchTotalCounts.fulfilled, (state, action) => {
      state.totalCounts.loading = false;
      state.totalCounts.data = action.payload;
    });
    builder.addCase(fetchTotalCounts.rejected, (state, action) => {
      state.totalCounts.error = action.error.message || "Error occured.";
    });
    builder.addCase(fetchAppointments.pending, (state, action) => {
        state.appointments.loading = true;
      }
    );
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.appointments.loading = false;
      state.appointments.data = action.payload;
    });
    builder.addCase(fetchAppointments.rejected, (state, action) => {
      state.appointments.error = action.error.message || "Error occured.";
    });
    builder.addCase(fetchDocuments.pending, (state, action) => {
        state.documents.loading = true;
      }
    );
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.documents.loading = false;
      state.documents.data = action.payload;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.documents.error = action.error.message || "Error occured.";
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
        state.users.loading = true;
      }
    );
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.loading = false;
      state.users.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users.error = action.error.message || "Error occured.";
    });

    builder.addCase(fetchCategory.pending, (state, action) => {
        state.category.loading = true;
      }
    );
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category.loading = false;
      state.category.data = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.category.error = action.error.message || "Error occured.";
    });

    builder.addCase(fetchAdmins.pending, (state, action) => {
        state.admins.loading = true;
      }
    );
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.admins.loading = false;
      state.admins.data = action.payload;
    });
    builder.addCase(fetchAdmins.rejected, (state, action) => {
      state.admins.error = action.error.message || "Error occured.";
    });

  },
});

export default admindasSlice.reducer;
