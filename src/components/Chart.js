import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [ // 예시 더미 데이터 나중에 데이터 구조 보고 대체
    { date: "3.11", total: 35, similarity: 20 },
    { date: "3.12", total: 33, similarity: 40 },
    { date: "3.14", total: 50, similarity: 60 },
    { date: "3.19", total: 90, similarity: 40 },
    { date: "3.20", total: 85, similarity: 50 },
    { date: "3.21", total: 60, similarity: 70 },
    { date: "3.22", total: 70, similarity: 100 },
];

const Chart = () => {
    return (
        <div style={{ width: "100%", maxWidth: "728px", height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#000"
                        name="총점"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="similarity"
                        stroke="#81d742"
                        strokeWidth={2}
                        name="유사성"
                        strokeDasharray="4 4"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
