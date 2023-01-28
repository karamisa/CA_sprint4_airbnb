import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function TableLoader() {
    const demoOrders = Array.from({ length: 10 }, (_, i) => ({ _id: i + 101 }));
    return (
        demoOrders.map((demoOrder) => {
            return (
                <tr key={demoOrder._id}>
                    <td>
                        <Skeleton variant="text" sx={{ fontSize: '0.8rem', width: '55%' }} />
                    </td>
                    <td>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '55%' }} />
                    </td>
                    <td>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '55%' }} />
                    </td>
                    <td>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '55%' }} />
                    </td>
                    <td>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '55%' }} />
                    </td>
                    <td>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '55%' }} />
                    </td>
                </tr>
            )

        }
        ))
}
