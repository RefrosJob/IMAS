import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function slice<T>(name: string, value: T) {
    interface CounterState {
        value: T;
    }

    const initialState: CounterState = {
        value,
    };
    const slice = createSlice({
        name,
        initialState,
        reducers: {
            set: (state, value) => {
                state.value = value.payload;
            },
        },
    });

    return slice;
}
