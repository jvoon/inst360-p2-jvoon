/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */
function showStats(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  /*html*/
    const total = data.length;

    // Helper to calculate percentage
    const calcPercent = (value) => ((value / total) * 100).toFixed(1);

    // Count by type
    const typeSummary = data.reduce((acc, item) => {
        const type = item.type || "Unknown";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});
    const typeStats = Object.entries(typeSummary).sort((a,b) => b[1]-a[1]);

    // Count by Amiibo Series
    const seriesSummary = data.reduce((acc, item) => {
        const series = item.amiiboSeries || "Unknown";
        acc[series] = (acc[series] || 0) + 1;
        return acc;
    }, {});
    const seriesStats = Object.entries(seriesSummary).sort((a,b) => b[1]-a[1]);

    // Count by Game Series
    const gameSummary = data.reduce((acc, item) => {
        const game = item.gameSeries || "Unknown";
        acc[game] = (acc[game] || 0) + 1;
        return acc;
    }, {});
    const gameStats = Object.entries(gameSummary).sort((a,b) => b[1]-a[1]);

    // Count by Region
    const regions = ["na", "jp", "eu", "au"];
    const regionSummary = regions.reduce((acc, r) => {
        acc[r] = data.filter(item => item.release?.[r]).length;
        return acc;
    }, {});
    const regionStats = Object.entries(regionSummary);


    /*html*/ 
    return `
        
        <h1 style="text-align: center;">Total Amiibos: ${total}</h1>
            <div class="stats-container">

                <div class="stat-box">
                    <h3>By Type</h3>
                    <ul>
                    ${typeStats.map(([type, count]) => `
                        <li>
                        ${type}: ${count} (${calcPercent(count)}%)
                        <div class="bar" style="width: ${calcPercent(count)}%"></div>
                        </li>`).join("")}
                    </ul>
                </div>

                <div class="stat-box">
                    <h3>By Amiibo Series</h3>
                    <ul>
                    ${seriesStats.map(([series, count]) => `
                        <li>
                        ${series}: ${count} (${calcPercent(count)}%)
                        <div class="bar" style="width: ${calcPercent(count)}%"></div>
                        </li>`).join("")}
                    </ul>
                </div>

                <div class="stat-box">
                    <h3>By Game Series</h3>
                    <ul>
                    ${gameStats.map(([game, count]) => `
                        <li>
                        ${game}: ${count} (${calcPercent(count)}%)
                        <div class="bar" style="width: ${calcPercent(count)}%"></div>
                        </li>`).join("")}
                    </ul>
                </div>

                <div class="stat-box">
                    <h3>By Region</h3>
                    <ul>
                    ${regionStats.map(([region, count]) => `
                        <li>
                        ${region.toUpperCase()}: ${count} (${calcPercent(count)}%)
                        <div class="bar" style="width: ${calcPercent(count)}%"></div>
                        </li>`).join("")}
                    </ul>
                </div>

            </div>
    `;
}

export default showStats