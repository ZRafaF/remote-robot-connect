// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type PidType = {
	p: number;
	i: number;
	d: number;
};

type PidResponse = {
	pid: Array<[number, number, number]>;
};
