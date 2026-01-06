import localFont from 'next/font/local'

export const mono = localFont({
	src: [
		{
			path: './mono/mono-thin.otf',
			weight: '100',
			style: 'normal',
		},
		{
			path: './mono/mono-thin-oblique.otf',
			weight: '100',
			style: 'italic',
		},
		{
			path: './mono/mono-extra-light.otf',
			weight: '200',
			style: 'normal',
		},
		{
			path: './mono/mono-extra-light-oblique.otf',
			weight: '200',
			style: 'italic',
		},
		{
			path: './mono/mono-light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: './mono/mono-light-oblique.otf',
			weight: '300',
			style: 'italic',
		},
		{
			path: './mono/mono-semi-light.otf',
			weight: '350',
			style: 'normal',
		},
		{
			path: './mono/mono-semi-light-oblique.otf',
			weight: '350',
			style: 'italic',
		},
		{
			path: './mono/mono-regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './mono/mono-oblique.otf',
			weight: '400',
			style: 'italic',
		},
		{
			path: './mono/mono-medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: './mono/mono-medium-oblique.otf',
			weight: '500',
			style: 'italic',
		},
		{
			path: './mono/mono-semi-bold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: './mono/mono-semi-bold-oblique.otf',
			weight: '600',
			style: 'italic',
		},
		{
			path: './mono/mono-bold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './mono/mono-bold-oblique.otf',
			weight: '700',
			style: 'italic',
		},
		{
			path: './mono/mono-extra-bold.otf',
			weight: '800',
			style: 'normal',
		},
		{
			path: './mono/mono-extra-bold-oblique.otf',
			weight: '800',
			style: 'italic',
		},
		{
			path: './mono/mono-black.otf',
			weight: '900',
			style: 'normal',
		},
		{
			path: './mono/mono-black-oblique.otf',
			weight: '900',
			style: 'italic',
		},
	],
	variable: '--font-mono',
	display: 'swap',
})
