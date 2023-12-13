import { Button, Typography } from '../../components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const HomePage: React.FC = () => {
	return (
		<div className="h-full w-full pt-24 flex-col flex font-secondary">
			<Typography
				type="h1"
				className="text-primary font-bold text-center uppercase"
			>
				Benvenuto nell'app Realtime Quiz!
			</Typography>
			<div className="flex justify-center h-full items-center gap-8">
				<Button
					icon={faPlus}
					iconPosition="right"
					size="large"
					text="Crea Quiz Room"
					className="font-secondary"
				/>
				<div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
					<Typography type="h3" className="uppercase">
						Entra in una quiz room
					</Typography>
					<ul className="border-2 border-primary rounded-xl p-4">
						<div className="flex justify-between items-center gap-2">
							<Button
								variant="wrapper"
								className="bg-stone hover:bg-opacity-70 w-full flex justify-between"
							>
								<Typography type="span" className="!text-xl">
									Test Room
								</Typography>
								<div className="flex gap-2 items-center">
									<div className="rounded-full w-3 h-3 bg-primary border-[1px] border-black" />
									<Typography type="span" className="!text-lg">
										4/6
									</Typography>
								</div>
							</Button>
							<Typography type="span">30s</Typography>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomePage;