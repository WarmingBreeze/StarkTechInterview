import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("target");
  const query = Object.fromEntries(searchParams.entries());

  let queryString: string;
  if (target === "searchbar") {
    queryString = "dataset=TaiwanStockInfo";
  } else if (target === "header") {
    const { data_id } = query;
    queryString = `dataset=TaiwanStockInfo&data_id=${data_id}`;
  } else if (target === "chart") {
    const { data_id, start_date, end_date } = query;
    queryString = `dataset=TaiwanStockMonthRevenue&data_id=${data_id}&start_date=${start_date}&end_date=${end_date}`;
  }

  const url = `https://api.finmindtrade.com/api/v4/data?${queryString}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error: ", error);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
