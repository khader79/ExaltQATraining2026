import { expect } from "@playwright/test";

export class UiValid {
  constructor(page) {
    this.page = page;
    this.header = page.locator("#stats");
    this.graph = page.locator("#genderChart");
  }

  async validateUi() {
    const textContent = await this.header.textContent();
    const totalCivils = Number(textContent.match(/Total Civils: (\d+)/)?.[1]);
    const numberofMales = Number(textContent.match(/Males: (\d+)/)?.[1]);
    const numberofFemales = Number(textContent.match(/Females: (\d+)/)?.[1]);
    
    await expect(numberofMales + numberofFemales).toStrictEqual(totalCivils);
    await expect(totalCivils).toBeGreaterThan(0);
    await expect(numberofMales).toBeGreaterThan(0);
    await expect(numberofFemales).toBeGreaterThan(0); 
    await expect(this.header).toHaveText(
      /Total Civils: [1-9]\d*, Males: [1-9]\d*, Females: [1-9]\d*/,
    );

  }

 async validateGraph() {
  await expect(this.graph).toBeVisible();

 const chartData = await this.page.evaluate(() => {
  const chart = Chart.getChart("genderChart");
  return chart?.data?.datasets?.[0]?.data;
});

expect(chartData).toBeTruthy();
expect(chartData.some(v => v > 0)).toBeTruthy();
}
}
